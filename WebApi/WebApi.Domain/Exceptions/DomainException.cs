using System;

namespace WebApi.Domain.Exceptions;

public class DomainException(string message) : Exception(message)
{

}
