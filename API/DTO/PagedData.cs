using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace API.DTO
{
    public class PagedData<T>
    {
        public List<T> Records { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        // [JsonConstructor]
        // public PagedData(List<T> records, int totalCount, int pageNumber, int pageSize)
        // {
        //     this.Records = records;
        //     this.TotalCount = totalCount;
        //     this.PageNumber = pageNumber;
        //     this.PageSize = pageSize;
        // }
        
    }
}