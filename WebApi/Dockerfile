# build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY WebApi.sln .
COPY WebApi.Domain/WebApi.Domain.csproj WebApi.Domain/
COPY WebApi.Application/WebApi.Application.csproj WebApi.Application/
COPY WebApi.Infra/WebApi.Infra.csproj WebApi.Infra/
COPY WebApi.Api/WebApi.Api.csproj WebApi.Api/

RUN dotnet restore WebApi.Api/WebApi.Api.csproj

COPY WebApi.Domain/. WebApi.Domain/
COPY WebApi.Application/. WebApi.Application/
COPY WebApi.Infra/. WebApi.Infra/
COPY WebApi.Api/. WebApi.Api/

RUN dotnet publish WebApi.Api/WebApi.Api.csproj -c Release -o /app/publish --no-restore

# runtime

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "WebApi.Api.dll"]
