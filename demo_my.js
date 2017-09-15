
goog.require('goog.dom');
goog.require('goog.json');
goog.require('goog.proto2.ObjectSerializer');
goog.require('goog.string.StringBuffer');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

function phoneNumberParser(regionCode, phoneNumber) {
  var $ = goog.dom.getElement;
  var phoneNumber = phoneNumber || $('phoneNumber').value;
  var regionCode = regionCode || $('defaultCountry').value;
  var output = new goog.string.StringBuffer();
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
    var output = new goog.proto2.ObjectSerializer(goog.proto2.ObjectSerializer.KeyOption.NAME).serialize(number)
    var isPossible = phoneUtil.isPossibleNumber(number);
    var isNumberValid = phoneUtil.isValidNumber(number);
    var PNT = i18n.phonenumbers.PhoneNumberType;
    var numberRegion = phoneUtil.getRegionCodeForNumber(number)
    var getNumberType = ''
    var isValidNumberForRegion = ''
    if (isNumberValid && regionCode && regionCode != 'ZZ') {
        isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, regionCode);
    }
    switch (phoneUtil.getNumberType(number)) {
        case PNT.FIXED_LINE:
         getNumberType = 'FIXED_LINE'
          break;
        case PNT.MOBILE:
          getNumberType = 'MOBILE';
          break;
        case PNT.FIXED_LINE_OR_MOBILE:
          getNumberType = 'FIXED_LINE_OR_MOBILE';
          break;
        case PNT.TOLL_FREE:
          getNumberType = 'TOLL_FREE';
          break;
        case PNT.PREMIUM_RATE:
          getNumberType = 'PREMIUM_RATE';
          break;
        case PNT.SHARED_COST:
          getNumberType = 'SHARED_COST';
          break;
        case PNT.VOIP:
          getNumberType = 'VOIP';
          break;
        case PNT.PERSONAL_NUMBER:
          getNumberType = 'PERSONAL_NUMBER';
          break;
        case PNT.PAGER:
          getNumberType = 'PAGER';
          break;
        case PNT.UAN:
          getNumberType = 'UAN';
          break;
        case PNT.UNKNOWN:
          getNumberType = 'UNKNOWN';
          break;
    }
    output.isPossible = isPossible
    output.isValidNumber = isNumberValid
    output.isValidNumberForRegion = isValidNumberForRegion
    output.numberRegion = numberRegion
    output.getNumberType = getNumberType
    return output;
  } catch (e) {
    return e.toString();
  }
}
goog.exportSymbol('phoneNumberParser', phoneNumberParser);
