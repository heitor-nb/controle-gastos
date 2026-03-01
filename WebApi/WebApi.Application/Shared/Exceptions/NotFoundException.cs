using System;

namespace WebApi.Application.Shared.Exceptions;

public class NotFoundException(string message) : AppException(message)
{

}
