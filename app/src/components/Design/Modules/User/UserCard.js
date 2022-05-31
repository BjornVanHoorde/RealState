import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton"
import FlexContainer from "../../Container/FlexContainer"
import Col from "../../Table/Col"

const UserCard = ({ user, onDelete }) => {

  return (
    <Col size="5" className="bg-white mx-3 shadow">
      <FlexContainer content="between">
        <p className="m-0 p-2">{`${user.firstName} ${user.lastName}`}</p>
        <DeleteButton scope="users" id={user.id} onSuccess={onDelete} color="link" />
      </FlexContainer>
    </Col>
  )
}

export default UserCard