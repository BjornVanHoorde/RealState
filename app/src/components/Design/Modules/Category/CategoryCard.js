import { BiEditAlt } from "react-icons/bi";
import Button from "../../Button/Button";
import FlexContainer from "../../Container/FlexContainer";
import Col from "../../Table/Col";
import Row from "../../Table/Row";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import Container from "../../Container/Container";
import PropTypes from "prop-types";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <Col size="3">
      <Container className="bg-white shadow">
        <Row>
          <Col size="8">
            <p className="m-0 p-2">{category.name}</p>
          </Col>
          <Col size="4">
            <FlexContainer content="end">
              <Button onClick={() => onEdit(category)} color="link">
                <h4 className="text-info">
                  <BiEditAlt />
                </h4>
              </Button>
              <DeleteButton
                scope="categories"
                id={category.id}
                onSuccess={onDelete}
                color="link"
              />
            </FlexContainer>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryCard;
