import { BiEditAlt } from "react-icons/bi";
import Button from "../../../../Design/Button/Button";
import FlexContainer from "../../../../Design/Container/FlexContainer";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../Generic/Buttons/DeleteButton";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <Col size="3" className="mx-3">
      <Row className="bg-white shadow">
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
            <DeleteButton scope="categories" id={category.id} onSuccess={onDelete} color="link"/>
          </FlexContainer>
        </Col>
      </Row>
    </Col>
  );
};

export default CategoryCard;
