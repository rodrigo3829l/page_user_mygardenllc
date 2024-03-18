import axios from "axios";
import zxcvbn from 'zxcvbn';
import {i18n} from '@/main.js'
// Esta sirve para muchos datos como el nombre, apellido etc
export const nameValidate = value =>{
    return (value.length < 3 || !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(value))
    ? i18n.global.t('registration.alerts.firstName') 
    : '';
}

export const dateValidate = value =>{
    return (new Date().getFullYear() - new Date(value).getFullYear() < 18)
    ? i18n.global.t('registration.alerts.dateBirth') 
    : '';
}

export const ladeValidate = value =>{
    return (value)
    ? i18n.global.t('registration.alerts.lade') 
    : '';
}

export const phoneValidate = async (number, value) =>{
    try {
        const {data} = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${number}${value}`, {
            headers: {
            'apikey': 'isWBK7I7wNGIiFCcBpYICqSUGrKgpdDw'
            }
        });
        if (data.valid) {
            return  '';
        } else {
            return i18n.global.t('registration.alerts.number') 
        }
    } catch (error) {
        console.error(error);
    }
}

export const checkStrengthValid = value => {
    const passwordResult = zxcvbn(value);
    let passwordStrength, color;

    switch (passwordResult.score) {
        case 0:
            passwordStrength = 0;
            color = 'red-darken-4';
            break;
        case 1:
            passwordStrength = 25;
            color = 'red-darken-4';
            break;
        case 2:
            passwordStrength = 50;
            color = 'orange-darken-4';
            break;
        case 3:
            passwordStrength = 75;
            color = 'deep-orange-darken-4';
            break;
        case 4:
            passwordStrength = 100;
            color = 'green-darken-4';
            break;
        default:
            break;
    }

    return { passwordStrength, color };
}

// export const validatePostalCode = async value =>{
//     if (value.length !== 5 || !/^\d+$/.test(value)) {
//         return i18n.global.t('registration.alerts.postalCode');
//       }
//     try {
//         const {data} = await axios.get(`https://api.zippopotam.us/us/${value}`);
//         const placeName = data.places[0]['place name'];
//         return placeName
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }

export const handleImageUpload = value =>{
    let error
    // Check if a file is selected
    error = (!value) ? i18n.global.t('registration.alerts.imageFile') : '';

    // Check the file size (in bytes)
    const maxSize = 4 * 1024 * 1024; // 4 megabytes
    error = (value.size > maxSize) ? i18n.global.t('registration.alerts.sizeFile')  : '';

    return error
}

export const streetValidate = value =>{
    return (!value)
        ? i18n.global.t('registration.alerts.street')
        : '';
}

export const houseNumberValidate = value =>{
    return (value.length < 3 || !/^\d+$/.test(value))
        ? i18n.global.t('registration.alerts.houseNumber')
        : '';
}

export const userNameValidate = value =>{
    return (!value || value.length < 6 || !/^[a-zA-Z0-9]+$/.test(value))
        ? i18n.global.t('registration.alerts.userName')
        : '';
}

export const emailValidate = value =>{
    return (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value))
        ? ''
        : i18n.global.t('registration.alerts.email')
}

export const passwordValidate = value =>{
    if (value < 6) {
        return i18n.global.t('registration.alerts.alertLength');
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
        return i18n.global.t('registration.alerts.alertUppercase')
    }

    // Check for at least one number
    if (!/\d/.test(value)) {
        return i18n.global.t('registration.alerts.alertNumber')
    }
    
    // Check for only one special character
    const specialCharCount = (value.match(/[^A-Za-z0-9]/g) || []).length;
    if (specialCharCount !== 1) {
        return i18n.global.t('registration.alerts.alertCharacter')
    }
    return ''
}

export const neighborhoodValidate = value =>{
    // Define the regex pattern to match valid characters
    const validPattern = /^[a-zA-Z0-9\s'#]+$/;
    const hasInvalidChars = !validPattern.test(value);
    if (!value) {
        return i18n.global.t('registration.alerts.neighborhood') 
    } 

    // Check for invalid characters
    else if (hasInvalidChars) {
        return i18n.global.t('registration.alerts.invalidChars')
    }
    else{
        return ''
    }
}

// export const ladeValidate = value =>{
//     console.log(value)
// }

// export const ladeValidate = value =>{
//     console.log(value)
// }

// export const ladeValidate = value =>{
//     console.log(value)
// }

// export const ladeValidate = value =>{
//     console.log(value)
// }

// export const ladeValidate = value =>{
//     console.log(value)
// }

// export const ladeValidate = value =>{
//     console.log(value)
// }