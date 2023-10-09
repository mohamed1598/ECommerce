using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace shopAPI.Controllers
{
    [Route("errors/{code}")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(code);
        }
        
    }
}
