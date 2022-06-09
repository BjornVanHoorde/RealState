import { useEffect, useState } from "react";

const useFilter = (initialData, scope, searchParams) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (!!String(searchParams)) {
      switch (scope) {
        case "properties":
          filterProperties(initialData);
          break;
        case "agencies":
          filterAgencies(initialData);
          break;
        case "users":
          filterUsers(initialData);
          break;
        default:
          break;
      }
    }
  }, [searchParams, scope, initialData]);

  const filterProperties = (properties) => {
    if (searchParams.get("agencyId")) {
      properties = properties.filter(
        (property) =>
          property.agency.id === parseInt(searchParams.get("agencyId"))
      );
    }
    if (searchParams.get("cityId")) {
      properties = properties.filter(
        (property) =>
          property.address.city.id === parseInt(searchParams.get("cityId"))
      );
    }
    if (searchParams.get("status")) {
      properties = properties.filter(
        (property) => property.status === searchParams.get("status")
      );
    }
    if (searchParams.get("categoryId")) {
      properties = properties.filter(
        (property) =>
          property.category.id === parseInt(searchParams.get("categoryId"))
      );
    }
    if (searchParams.get("minPrice")) {
      properties = properties.filter(
        (property) => property.price >= parseInt(searchParams.get("minPrice"))
      );
    }
    if (searchParams.get("maxPrice")) {
      properties = properties.filter(
        (property) => property.price <= parseInt(searchParams.get("maxPrice"))
      );
    }

    setFilteredData(properties);
  };

  const filterAgencies = (agencies) => {
    if (searchParams.get("name")) {
      agencies = agencies.filter((agency) =>
        agency.name
          .toLowerCase()
          .includes(searchParams.get("name").toLowerCase())
      );
    }
    if (searchParams.get("email")) {
      agencies = agencies.filter((agency) =>
        agency.email
          .toLowerCase()
          .includes(searchParams.get("email").toLowerCase())
      );
    }
    if (searchParams.get("cityId")) {
      agencies = agencies.filter(
        (agency) =>
          agency.address.city.id === parseInt(searchParams.get("cityId"))
      );
    }

    setFilteredData(agencies);
  };

  const filterUsers = (users) => {
    if (searchParams.get("name")) {
      users = users.filter((user) =>
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
          searchParams.get("name").toLowerCase()
        )
      );
    }
    if (searchParams.get("email")) {
      users = users.filter((user) =>
        user.email
          .toLowerCase()
          .includes(searchParams.get("email").toLowerCase())
      );
    }
    if (searchParams.get("agencyId")) {
      users = users.filter((user) =>
        user.agency
          ? user.agency.id === parseInt(searchParams.get("agencyId"))
          : null
      );
    }

    setFilteredData(users);
  };

  const handleReset = () => {
    setFilteredData(initialData);
  };

  return { filteredData, handleReset };
};

export default useFilter;
