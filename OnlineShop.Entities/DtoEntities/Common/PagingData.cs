using System.Collections.Generic;

namespace OnlineShop.Entities.DtoEntities.Common
{
    public class PagingData
    {
        public PagingData() : this(0, 0)
        {
        }

        public PagingData(int pageIndex, int pageSize) : this(pageIndex, pageSize, null, null)
        {
        }

        public PagingData(int pageIndex, int pageSize, List<FilterDescriptorDto> filterColumns) : this(pageIndex, pageSize, filterColumns, null)
        {
        }

        public PagingData(int pageIndex, int pageSize, List<SortDescriptorDto> sortColumns) : this(pageIndex, pageSize, null, sortColumns)
        {
        }

        public PagingData(int pageIndex, int pageSize, List<FilterDescriptorDto> filterColumns, List<SortDescriptorDto> sortColumns)
        {
            PageIndex = pageIndex;
            Offset = (pageIndex - 1) * pageSize;
            Length = pageSize;
            FilterColumns = filterColumns ?? new List<FilterDescriptorDto>();
            SortColumns = sortColumns ?? new List<SortDescriptorDto>();
        }

        public int PageIndex { get; set; }
        public int Offset { get; set; }
        public int Length { get; set; }
        public List<FilterDescriptorDto> FilterColumns { get; set; }
        public List<SortDescriptorDto> SortColumns { get; set; }
    }

    public class PagingData<T> : PagingData
    {
        public PagingData() : this(0, 0, default(T))
        {
        }

        public PagingData(int pageIndex, int pageSize, T searchCriteria) : this(pageIndex, pageSize, searchCriteria, null, null)
        {
        }

        public PagingData(int pageIndex, int pageSize, T searchCriteria, List<FilterDescriptorDto> filterColumns) : this(pageIndex, pageSize, searchCriteria, filterColumns, null)
        {
        }

        public PagingData(int pageIndex, int pageSize, T searchCriteria, List<SortDescriptorDto> sortColumns) : this(pageIndex, pageSize, searchCriteria, null, sortColumns)
        {
        }

        public PagingData(int pageIndex, int pageSize, T searchCriteria, List<FilterDescriptorDto> filterColumns, List<SortDescriptorDto> sortColumns) : base(pageIndex, pageSize, filterColumns, sortColumns)
        {
            SearchCriteria = searchCriteria;
        }

        public T SearchCriteria { get; }
    }
}
