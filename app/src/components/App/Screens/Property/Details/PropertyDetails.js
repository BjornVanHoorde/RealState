import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import ContactForm from "../../../Shared/Message/Form/ContactForm";

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { property, onDelete } = useOutletContext();

  return (
    <>
      <Container className="text-end">
        <Button href={route(PropertyRoutes.Edit, { id: property.id })} >{t("properties.edit.title")}</Button>
        <DeleteButton
          scope="properties"
          id={property.id}
          onSuccess={onDelete}
          color="link"
        ></DeleteButton>
      </Container>
      <Container className="mt-3">
        <Row>
          <Col size="5">
            <Container>
              <img
                style={{ width: "100%" }}
                src={getImagePath(`public/images/${property.photos[0].path}`)}
                alt={property.photos[0].alt}
              />
            </Container>
          </Col>
          <Col size="7">
            <Container className="bg-white py-4 position-relative">
              <div className="position-absolute top-0 end-0">
                <img
                  style={{ width: "8rem" }}
                  src={getImagePath(`public/images/${property.agency.logo}`)}
                  alt={property.agency.logo}
                />
              </div>
              <h3>
                {property.category.name}{" "}
                {t(`properties.status.${property.status}`)}
              </h3>
              <h1>€ {property.price.toLocaleString("en-US")}</h1>
              <h4>{property.surface} M²</h4>
              <h4>
                {t("properties.details.buildYear")}{" "}
                {property.yearOfConstruction}
              </h4>
              <div className="text-end">
                <h3>
                  {property.address.street} {property.address.number}{" "}
                  {property.address.box ? ` box ${property.address.box}` : ""}
                </h3>
                <h3>
                  {property.address.city.zip} {property.address.city.name}
                </h3>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col size="7">
            <Container className="bg-white py-2">
              <h2>{t("properties.details.description")}</h2>
              <p>{property.description}</p>
            </Container>
          </Col>
          <Col size="5">
            <Container className="bg-white py-2">
              <h2>{t("properties.details.contact")}</h2>
              <ContactForm />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PropertyDetails;
