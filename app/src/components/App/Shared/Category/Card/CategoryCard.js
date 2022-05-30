import { BiEditAlt, BiTrash } from "react-icons/bi";
import Button from "../../../../Design/Button/Button";
import FlexContainer from "../../../../Design/Container/FlexContainer";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";

const CategoryCard = ({ category, onEditClick }) => {
  return (
    <Col size="3" className="mx-3">
      <Row className="bg-white shadow">
        <Col size="8">
          <p className="m-0 p-2">{category.name}</p>
        </Col>
        <Col size="4">
          <FlexContainer content="end">
            <Button onClick={() => onEditClick(category)} color="link">
              <h4 className="text-info">
                <BiEditAlt />
              </h4>
            </Button>
            <Button color="link">
              <h4 className="text-danger">
                <BiTrash />
              </h4>
            </Button>
          </FlexContainer>
        </Col>
      </Row>
    </Col>
  );
};

export default CategoryCard;
