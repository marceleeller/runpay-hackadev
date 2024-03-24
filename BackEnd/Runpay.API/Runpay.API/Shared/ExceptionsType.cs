namespace Runpay.API.Shared;

public class ExceptionsType : Exception
{

    public class UnauthorizedException : Exception
    {
        public UnauthorizedException(string message) : base(message)
        {
        }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }

    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        {
        }
    }

}
