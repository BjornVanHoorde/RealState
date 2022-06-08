import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import Container from "../../../Design/Container/Container";
import Modal from "../../../Design/Modal/Modal";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Button from "../../../Design/Button/Button";

const PhotoScreen = ({ photos, onDismiss }) => {
  const { t } = useTranslation();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const handlePreviousClick = () => {
    if (photos[currentPhoto - 1]) {
      setCurrentPhoto(currentPhoto - 1);
    } else {
      setCurrentPhoto(photos.length-1);
    }
  };

  const handleNextClick = () => {
    if (photos[currentPhoto + 1]) {
      setCurrentPhoto(currentPhoto + 1);
    } else {
      setCurrentPhoto(0);
    }
  };

  return (
    <Modal title={t("photos.title")} onDismiss={onDismiss}>
      <Container className="position-relative">
        <div className="position-absolute top-50 start-0 translate-middle">
          <Button onClick={handlePreviousClick} color="link">
            <h2>
              <BiLeftArrow />
            </h2>
          </Button>
        </div>
        <img
          style={{ width: "100%" }}
          src={getImagePath(photos[currentPhoto].path)}
          alt={currentPhoto.alt}
        />
        <div className="position-absolute top-50 start-100 translate-middle">
          <Button onClick={handleNextClick} color="link">
            <h2>
              <BiRightArrow />
            </h2>
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default PhotoScreen;
