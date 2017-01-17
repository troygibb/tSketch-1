import { ajax } from 'jquery';

export const changeAtramentOption = (change, changeValue) => {
  return {
    type: 'CHANGE-ATRAMENT-OPTION',
    change,
    changeValue,
  };
};

export const savePostcardImage = (postcardImage) => {
  return {
    type: 'SAVE-POSTCARD-IMAGE',
    postcardImage,
  };
};

export const changeMessage = (message) => {
  return {
    type: 'CHANGE-MESSAGE',
    message,
  };
};

export const completeOrder = ({ stripeToken, email, postcardImage, message }) => {
  return (dispatch) => {
    ajax({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      type: 'POST',
      data: {
        file: postcardImage,
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
      },
    })
    .done((uploadData) => {
      return ajax({
        type: 'POST',
        url: '/api/order',
        dataType: 'json',
        data: {
          stripeToken,
          email,
          postcardImage: uploadData,
          message,
        },
      });
    })
    .done((result) => {
      console.log(result);
      console.log('success');
    })
    .fail((err) => {
      console.log(err);
      console.log('ERRROR');
    });
  };
};
