namespace Runpay.API.Domains.DTOs.Responses;

public class MessageResponse
{
    public MessageResponse(string message)
    {
        Message = message;
    }

    public string Message { get; set; } = null!;
}
