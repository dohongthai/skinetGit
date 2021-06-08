using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItemsandOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsandOrderingSpecification(string email) :base (o => o.BuyerEmail ==email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsandOrderingSpecification(int id,string email) : base(o => o.Id==id && o.BuyerEmail==email)

        {
            AddInclude(o => o.OrderItems);
            AddInclude(o =>o.DeliveryMethod);
        }
    }
}