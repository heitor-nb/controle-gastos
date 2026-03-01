using System;

namespace WebApi.Application.Shared.Exceptions;

public class AppException(string message) : Exception(message)
{

}
