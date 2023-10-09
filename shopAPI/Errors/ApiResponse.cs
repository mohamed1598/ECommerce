﻿namespace shopAPI.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode,string message = "")
        {
            StatusCode = statusCode;
            Message = string.IsNullOrWhiteSpace(message)?GetDefaultMessageForStatisCode(statusCode):message;
        }

        private static string GetDefaultMessageForStatisCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request , you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate . hate leads to carrer change",
                _=> ""
            };

        }

        public int StatusCode { get; set; }
        public string Message { get; set; } = null!;
    }
}
