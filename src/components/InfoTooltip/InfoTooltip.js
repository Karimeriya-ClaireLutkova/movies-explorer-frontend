import React from 'react';
import updateSucces from '../../images/success.svg';
import { updateSuccessful, updateProfileInfo} from '../../utils/constants';
import './InfoTooltip.css';

function InfoTooltip (props) {
  const {name, isOpenInfoTooltip, onClose} = props;
  const className=`info-popup info-popup_type_${name} ${isOpenInfoTooltip ? "info-popup_opened" : ""}`;

  return (
    <div className={className}>
      <div className={`info-popup__container info-popup__container_type_${name}`}>
        <button type="button" onClick={onClose} className={`info-popup__button info-popup__button_close info-popup__button_close_${name}`} aria-label="Закрыть уведомление" />
        <div className={`info-popup__form info-popup__form_${name}`}>
          <img className={`info-popup__image info-popup__image_${name}`} src={updateSucces} alt={updateSuccessful} />
          <h2 className={`info-popup__title info-popup__title_${name}`}>{updateProfileInfo}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;