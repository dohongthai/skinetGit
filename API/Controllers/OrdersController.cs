using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Error;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;       
         private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;

        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();    //215  
            var address = _mapper.Map<AddressDto, Address> (orderDto.ShipToAddress);
            var order=await _orderService.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);  
            if (order == null ) return BadRequest(new ApiResponse(400, "xảy ra vấn đề khi tạo mới order"));
            return Ok(order);
             }

             [HttpGet]
             public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrderForUser()
             {
                 var email =HttpContext.User.RetrieveEmailFromPrincipal();
                 var orders =await _orderService.GetOrdersForUserAsync(email);
                 var orderToReturn= _mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders);
                 return Ok(orderToReturn);
             }

             [HttpGet ("{id}")]
             public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
             {
                 var email = HttpContext.User.RetrieveEmailFromPrincipal();
                 var order = await _orderService.GetOrderByIdAsync(id,email);
                 if(order==null)
                    return NotFound(new ApiResponse(404));
                    return _mapper.Map<Order,OrderToReturnDto>(order);            
             }
             [HttpGet("deliveryMethods")]
             
                 public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
                 {
                    return Ok(await _orderService.GetDeliveryMethodsAsync());
                 }
             
    }
}
