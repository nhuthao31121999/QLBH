namespace OnlineShop.Entities.DtoEntities.Common
{
    public class PagingData2
    {
        public PagingData2(int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            Offset = (pageIndex - 1) * pageSize;
            Length = pageSize;
        }

        public int PageIndex { get; set; }
        public int Offset { get; set; }
        public int Length { get; set; }
    }

    public class PagingData2<T> : PagingData2
    {
        public PagingData2(int pageIndex, int pageSize, T searchCriteria) : base(pageIndex, pageSize)
        {
            SearchCriteria = searchCriteria;
        }

        public T SearchCriteria { get; }
    }
}
