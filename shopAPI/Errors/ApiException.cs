namespace shopAPI.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode,string details, string message = "") : base(statusCode, message)
        {
            Details = details;
        }
        public string Details { get; set; }
    }
}
