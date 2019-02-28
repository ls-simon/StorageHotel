import {fieldInvalidWarning, passwordsDoNotMatchWarning, 
        publisherNotSetOnClientProfileCreationWarning, fieldIsNotSetWarning,
        productIdIsNotValidWarning, quantityIsNotNumberWarning} from './exceptions.js';


export function newProductIsValid(product) {

    if (newProductFieldsAreNotUndefined(product)) {
        if (quantityIsANumber(product.quantity)) {
            if (productIdIsANumber(product.productId)) {
                return true;
            }
        }
    } else {     
        fieldIsNotSetWarning();
        return false;
    }
}

export function productIdIsANumber(productId) {

    if (productId.match(/^\d+$/)) {
        return true;
    } else {
        productIdIsNotValidWarning();
        return false;
    }
}

export function quantityIsANumber(quantity) { 

    if (quantity.match(/^\d+$/)) {    
        return true;
    } else {
        quantityIsNotNumberWarning(); 
        return false;
    }
}

export function newProductFieldsAreNotUndefined(product) {

    if (product.quantity !== undefined) {
        if (product.productId !== undefined) {
            if (product.productName !== undefined) {
                return true;
            }
        }
    } 
    return false;
}

export function customerProfileFieldsAreValidated(fields) {
    if (isUserNameValid(fields.userName)) {
        if (isNickNameValid(fields.nickName)) {
            if (isEmailValid(fields.email)) {
                if (isPhoneValid(fields.phoneNumber)) {
                    if (isPublisherChosen(fields.userType, fields.selectedActorHexId)) {
                      if (isPasswordValid(fields.password, fields.passwordRepeat)) {
                          if (isAddressValid(fields.address)) {
                              if (isCityValid(fields.city)) {
                                  if (isZipCodeValid(fields.zipCode)) {
                                        return true;
                                  }
                              }
                          }        
                       }
                    }
                }
            }
        }
    }
    return false;
}

export function employeeProfileFieldsAreValidated(fields) {

    if (isUserNameValid(fields.userName)) {
        if (isNickNameValid(fields.nickName)) {
            if (fields.password && fields.passwordRepeat) {
                if (isPasswordValid(fields.password, fields.passwordRepeat)) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }
    return false;
}

export function userProfileFieldsAreValidated(fields) {

    if (isAddressValid(fields.address)) {
        if (isCityValid(fields.city)) {
            if (isZipCodeValid(fields.zipCode)) {
                if (isUserNameValid(fields.userName)) {
                    if (isEmailValid(fields.email)) {
                        if (isPhoneValid(fields.phoneNumber)) {
                                if (isNickNameValid(fields.nickName)) {
                                    if (fields.passwordNew && fields.passwordNewRepeat) {
                                        if (isPasswordValid(fields.passwordNew, fields.passwordNewRepeat)) {
                                            return true;
                                        }   
                                    } else {
                                        return true;
                                    }
                                }
                            
                        }
                    }
                }
            }
        }
    }
    return false;
}

export function isOrderAddressValid(fields) {

    if (isAddressValid(fields.address)) {
        if (isCityValid(fields.city)) {
            if (isZipCodeValid(fields.zipCode)) {
                if (isPhoneValid(fields.phone)) {
                        if (isContactPersonValid(fields.contact)) {
                            return true;
                        }
                    
                }
            }
        }
    }
    return false;
} 

export function isContactPersonValid(contact) {

    if (contact.match(/\w+/)) {
        return true;
    } else {
        fieldInvalidWarning({contact});
        return false;
    }
}
export function isAddressValid(address) {

    if (address.match(/[A-Za-z0-9\.\-\s\,\d]/)) {
        return true;
    } else {
        fieldInvalidWarning({address});
        return false;
    }
}

export function isCityValid(city) {

    if (city.match(/\w*/)) {
        return true;
    } else {
        fieldInvalidWarning({city});
        return false;
    }
}

export function isZipCodeValid(zip) {

    if (zip.match(/\d{4,5}/)) {
        return true;
    } else {
        fieldInvalidWarning({zip});
        return false;
    }
}

export function isUserNameValid(userName) {

    if (userName.match(/[\w\d]/)) {
        return true;
    } else {
        fieldInvalidWarning({userName});
        return false;
    }
}

export function isNickNameValid(nickName) {

    if (nickName.match(/.*/)) {
        return true;
    } else {
        fieldInvalidWarning({nickName});
        return false;
    }
}

export function isEmailValid(email) {

    if (email.match(/.+@.+\.\w+/)) {
        return true;
    } else {
        fieldInvalidWarning({email});
        return false;
    }
}

export function isPhoneValid(phone) {

    if (phone.match(/\+?\d+/)) {
        return true;
    } else {
        fieldInvalidWarning({phone});
        return false;
    }
}



export function isPasswordValid(password, retypedPassword) {

    if (password === retypedPassword) {
    if (password.match(/[\S]/)) {
        return true;
    } else {
        fieldInvalidWarning({password});
        return false;
        }
    } else {
        passwordsDoNotMatchWarning();
    }
}

export function isPublisherChosen(userType, pubHex) {
    
    if (userType.toLowerCase() === 'client' && pubHex.toLowerCase() === 'default') {
        publisherNotSetOnClientProfileCreationWarning();
        return false;
    } 
    return true;
}