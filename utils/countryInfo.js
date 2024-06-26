const countryInfoData = {
    "Unknown": { countryFullname: "Unknown", countryFlag: "🤷🏽‍♀️" },
    "AF": { countryFullname: "Afghanistan", countryFlag: "🇦🇫" },
    "AX": { countryFullname: "Åland Islands", countryFlag: "🇦🇽" },
    "AL": { countryFullname: "Albania", countryFlag: "🇦🇱" },
    "DZ": { countryFullname: "Algeria", countryFlag: "🇩🇿" },
    "AS": { countryFullname: "American Samoa", countryFlag: "🇦🇸" },
    "AD": { countryFullname: "Andorra", countryFlag: "🇦🇩" },
    "AO": { countryFullname: "Angola", countryFlag: "🇦🇴" },
    "AI": { countryFullname: "Anguilla", countryFlag: "🇦🇮" },
    "AQ": { countryFullname: "Antarctica", countryFlag: "🇦🇶" },
    "AG": { countryFullname: "Antigua and Barbuda", countryFlag: "🇦🇬" },
    "AR": { countryFullname: "Argentina", countryFlag: "🇦🇷" },
    "AM": { countryFullname: "Armenia", countryFlag: "🇦🇲" },
    "AW": { countryFullname: "Aruba", countryFlag: "🇦🇼" },
    "AU": { countryFullname: "Australia", countryFlag: "🇦🇺" },
    "AT": { countryFullname: "Austria", countryFlag: "🇦🇹" },
    "AZ": { countryFullname: "Azerbaijan", countryFlag: "🇦🇿" },
    "BS": { countryFullname: "Bahamas", countryFlag: "🇧🇸" },
    "BH": { countryFullname: "Bahrain", countryFlag: "🇧🇭" },
    "BD": { countryFullname: "Bangladesh", countryFlag: "🇧🇩" },
    "BB": { countryFullname: "Barbados", countryFlag: "🇧🇧" },
    "BY": { countryFullname: "Belarus", countryFlag: "🇧🇾" },
    "BE": { countryFullname: "Belgium", countryFlag: "🇧🇪" },
    "BZ": { countryFullname: "Belize", countryFlag: "🇧🇿" },
    "BJ": { countryFullname: "Benin", countryFlag: "🇧🇯" },
    "BM": { countryFullname: "Bermuda", countryFlag: "🇧🇲" },
    "BT": { countryFullname: "Bhutan", countryFlag: "🇧🇹" },
    "BO": { countryFullname: "Plurinational State of Bolivia", countryFlag: "🇧🇴" },
    "BA": { countryFullname: "Bosnia and Herzegovina", countryFlag: "🇧🇦" },
    "BW": { countryFullname: "Botswana", countryFlag: "🇧🇼" },
    "BV": { countryFullname: "Bouvet Island", countryFlag: "🇧🇻" },
    "BR": { countryFullname: "Brazil", countryFlag: "🇧🇷" },
    "IO": { countryFullname: "British Indian Ocean Territory", countryFlag: "🇮🇴" },
    "BN": { countryFullname: "Brunei Darussalam", countryFlag: "🇧🇳" },
    "BG": { countryFullname: "Bulgaria", countryFlag: "🇧🇬" },
    "BF": { countryFullname: "Burkina Faso", countryFlag: "🇧🇫" },
    "BI": { countryFullname: "Burundi", countryFlag: "🇧🇮" },
    "KH": { countryFullname: "Cambodia", countryFlag: "🇰🇭" },
    "CM": { countryFullname: "Cameroon", countryFlag: "🇨🇲" },
    "CA": { countryFullname: "Canada", countryFlag: "🇨🇦" },
    "CV": { countryFullname: "Cabo Verde", countryFlag: "🇨🇻" },
    "KY": { countryFullname: "Cayman Islands", countryFlag: "🇰🇾" },
    "CF": { countryFullname: "Central African Republic", countryFlag: "🇨🇫" },
    "TD": { countryFullname: "Chad", countryFlag: "🇹🇩" },
    "CL": { countryFullname: "Chile", countryFlag: "🇨🇱" },
    "CN": { countryFullname: "China", countryFlag: "🇨🇳" },
    "CX": { countryFullname: "Christmas Island", countryFlag: "🇨🇽" },
    "CC": { countryFullname: "Cocos (Keeling) Islands", countryFlag: "🇨🇨" },
    "CO": { countryFullname: "Colombia", countryFlag: "🇨🇴" },
    "KM": { countryFullname: "Comoros", countryFlag: "🇰🇲" },
    "CG": { countryFullname: "Congo", countryFlag: "🇨🇬" },
    "CD": { countryFullname: "The Democratic Republic of the Congo", countryFlag: "🇨🇩" },
    "CK": { countryFullname: "Cook Islands", countryFlag: "🇨🇰" },
    "CR": { countryFullname: "Costa Rica", countryFlag: "🇨🇷" },
    "CI": { countryFullname: "Côte d'Ivoire", countryFlag: "🇨🇮" },
    "HR": { countryFullname: "Croatia", countryFlag: "🇭🇷" },
    "CU": { countryFullname: "Cuba", countryFlag: "🇨🇺" },
    "CY": { countryFullname: "Cyprus", countryFlag: "🇨🇾" },
    "CZ": { countryFullname: "Czechia", countryFlag: "🇨🇿" },
    "DK": { countryFullname: "Denmark", countryFlag: "🇩🇰" },
    "DJ": { countryFullname: "Djibouti", countryFlag: "🇩🇯" },
    "DM": { countryFullname: "Dominica", countryFlag: "🇩🇲" },
    "DO": { countryFullname: "Dominican Republic", countryFlag: "🇩🇴" },
    "EC": { countryFullname: "Ecuador", countryFlag: "🇪🇨" },
    "EG": { countryFullname: "Egypt", countryFlag: "🇪🇬" },
    "SV": { countryFullname: "El Salvador", countryFlag: "🇸🇻" },
    "GQ": { countryFullname: "Equatorial Guinea", countryFlag: "🇬🇶" },
    "ER": { countryFullname: "Eritrea", countryFlag: "🇪🇷" },
    "EE": { countryFullname: "Estonia", countryFlag: "🇪🇪" },
    "SZ": { countryFullname: "Eswatini", countryFlag: "🇸🇿" },
    "ET": { countryFullname: "Ethiopia", countryFlag: "🇪🇹" },
    "FK": { countryFullname: "Falkland Islands (Malvinas)", countryFlag: "🇫🇰" },
    "FO": { countryFullname: "Faroe Islands", countryFlag: "🇫🇴" },
    "FJ": { countryFullname: "Fiji", countryFlag: "🇫🇯" },
    "FI": { countryFullname: "Finland", countryFlag: "🇫🇮" },
    "FR": { countryFullname: "France", countryFlag: "🇫🇷" },
    "GF": { countryFullname: "French Guiana", countryFlag: "🇬🇫" },
    "PF": { countryFullname: "French Polynesia", countryFlag: "🇵🇫" },
    "TF": { countryFullname: "French Southern Territories", countryFlag: "🇹🇫" },
    "GA": { countryFullname: "Gabon", countryFlag: "🇬🇦" },
    "GM": { countryFullname: "Gambia", countryFlag: "🇬🇲" },
    "GE": { countryFullname: "Georgia", countryFlag: "🇬🇪" },
    "DE": { countryFullname: "Germany", countryFlag: "🇩🇪" },
    "GH": { countryFullname: "Ghana", countryFlag: "🇬🇭" },
    "GI": { countryFullname: "Gibraltar", countryFlag: "🇬🇮" },
    "GR": { countryFullname: "Greece", countryFlag: "🇬🇷" },
    "GL": { countryFullname: "Greenland", countryFlag: "🇬🇱" },
    "GD": { countryFullname: "Grenada", countryFlag: "🇬🇩" },
    "GP": { countryFullname: "Guadeloupe", countryFlag: "🇬🇵" },
    "GU": { countryFullname: "Guam", countryFlag: "🇬🇺" },
    "GT": { countryFullname: "Guatemala", countryFlag: "🇬🇹" },
    "GG": { countryFullname: "Guernsey", countryFlag: "🇬🇬" },
    "GN": { countryFullname: "Guinea", countryFlag: "🇬🇳" },
    "GW": { countryFullname: "Guinea-Bissau", countryFlag: "🇬🇼" },
    "GY": { countryFullname: "Guyana", countryFlag: "🇬🇾" },
    "HT": { countryFullname: "Haiti", countryFlag: "🇭🇹" },
    "HM": { countryFullname: "Heard Island and McDonald Islands", countryFlag: "🇭🇲" },
    "VA": { countryFullname: "Holy See (Vatican City State)", countryFlag: "🇻🇦" },
    "HN": { countryFullname: "Honduras", countryFlag: "🇭🇳" },
    "HK": { countryFullname: "Hong Kong", countryFlag: "🇭🇰" },
    "HU": { countryFullname: "Hungary", countryFlag: "🇭🇺" },
    "IS": { countryFullname: "Iceland", countryFlag: "🇮🇸" },
    "IN": { countryFullname: "India", countryFlag: "🇮🇳" },
    "ID": { countryFullname: "Indonesia", countryFlag: "🇮🇩" },
    "IR": { countryFullname: "Iran", countryFlag: "🇮🇷" },
    "IQ": { countryFullname: "Iraq", countryFlag: "🇮🇶" },
    "IE": { countryFullname: "Ireland", countryFlag: "🇮🇪" },
    "IM": { countryFullname: "Isle of Man", countryFlag: "🇮🇲" },
    "IL": { countryFullname: "Israel", countryFlag: "🇮🇱" },
    "IT": { countryFullname: "Italy", countryFlag: "🇮🇹" },
    "JM": { countryFullname: "Jamaica", countryFlag: "🇯🇲" },
    "JP": { countryFullname: "Japan", countryFlag: "🇯🇵" },
    "JE": { countryFullname: "Jersey", countryFlag: "🇯🇪" },
    "JO": { countryFullname: "Jordan", countryFlag: "🇯🇴" },
    "KZ": { countryFullname: "Kazakhstan", countryFlag: "🇰🇿" },
    "KE": { countryFullname: "Kenya", countryFlag: "🇰🇪" },
    "KI": { countryFullname: "Kiribati", countryFlag: "🇰🇮" },
    "KP": { countryFullname: "North Korea", countryFlag: "🇰🇵" },
    "KR": { countryFullname: "Korea, Republic of", countryFlag: "🇰🇷" },
    "KW": { countryFullname: "Kuwait", countryFlag: "🇰🇼" },
    "KG": { countryFullname: "Kyrgyzstan", countryFlag: "🇰🇬" },
    "LA": { countryFullname: "Laos", countryFlag: "🇱🇦" },
    "LV": { countryFullname: "Latvia", countryFlag: "🇱🇻" },
    "LB": { countryFullname: "Lebanon", countryFlag: "🇱🇧" },
    "LS": { countryFullname: "Lesotho", countryFlag: "🇱🇸" },
    "LR": { countryFullname: "Liberia", countryFlag: "🇱🇷" },
    "LY": { countryFullname: "Libya", countryFlag: "🇱🇾" },
    "LI": { countryFullname: "Liechtenstein", countryFlag: "🇱🇮" },
    "LT": { countryFullname: "Lithuania", countryFlag: "🇱🇹" },
    "LU": { countryFullname: "Luxembourg", countryFlag: "🇱🇺" },
    "MO": { countryFullname: "Macao", countryFlag: "🇲🇴" },
    "MG": { countryFullname: "Madagascar", countryFlag: "🇲🇬" },
    "MW": { countryFullname: "Malawi", countryFlag: "🇲🇼" },
    "MY": { countryFullname: "Malaysia", countryFlag: "🇲🇾" },
    "MV": { countryFullname: "Maldives", countryFlag: "🇲🇻" },
    "ML": { countryFullname: "Mali", countryFlag: "🇲🇱" },
    "MT": { countryFullname: "Malta", countryFlag: "🇲🇹" },
    "MH": { countryFullname: "Marshall Islands", countryFlag: "🇲🇭" },
    "MQ": { countryFullname: "Martinique", countryFlag: "🇲🇶" },
    "MR": { countryFullname: "Mauritania", countryFlag: "🇲🇷" },
    "MU": { countryFullname: "Mauritius", countryFlag: "🇲🇺" },
    "YT": { countryFullname: "Mayotte", countryFlag: "🇾🇹" },
    "MX": { countryFullname: "Mexico", countryFlag: "🇲🇽" },
    "FM": { countryFullname: "Micronesia", countryFlag: "🇫🇲" },
    "MD": { countryFullname: "Moldova", countryFlag: "🇲🇩" },
    "MC": { countryFullname: "Monaco", countryFlag: "🇲🇨" },
    "MN": { countryFullname: "Mongolia", countryFlag: "🇲🇳" },
    "ME": { countryFullname: "Montenegro", countryFlag: "🇲🇪" },
    "MS": { countryFullname: "Montserrat", countryFlag: "🇲🇸" },
    "MA": { countryFullname: "Morocco", countryFlag: "🇲🇦" },
    "MZ": { countryFullname: "Mozambique", countryFlag: "🇲🇿" },
    "MM": { countryFullname: "Myanmar", countryFlag: "🇲🇲" },
    "NA": { countryFullname: "Namibia", countryFlag: "🇳🇦" },
    "NR": { countryFullname: "Nauru", countryFlag: "🇳🇷" },
    "NP": { countryFullname: "Nepal", countryFlag: "🇳🇵" },
    "NL": { countryFullname: "Netherlands", countryFlag: "🇳🇱" },
    "NC": { countryFullname: "New Caledonia", countryFlag: "🇳🇨" },
    "NZ": { countryFullname: "New Zealand", countryFlag: "🇳🇿" },
    "NI": { countryFullname: "Nicaragua", countryFlag: "🇳🇮" },
    "NE": { countryFullname: "Niger", countryFlag: "🇳🇪" },
    "NG": { countryFullname: "Nigeria", countryFlag: "🇳🇬" },
    "NU": { countryFullname: "Niue", countryFlag: "🇳🇺" },
    "NF": { countryFullname: "Norfolk Island", countryFlag: "🇳🇫" },
    "MK": { countryFullname: "North Macedonia", countryFlag: "🇲🇰" },
    "MP": { countryFullname: "Northern Mariana Islands", countryFlag: "🇲🇵" },
    "NO": { countryFullname: "Norway", countryFlag: "🇳🇴" },
    "OM": { countryFullname: "Oman", countryFlag: "🇴🇲" },
    "PK": { countryFullname: "Pakistan", countryFlag: "🇵🇰" },
    "PW": { countryFullname: "Palau", countryFlag: "🇵🇼" },
    "PS": { countryFullname: "Palestine, State of", countryFlag: "🇵🇸" },
    "PA": { countryFullname: "Panama", countryFlag: "🇵🇦" },
    "PG": { countryFullname: "Papua New Guinea", countryFlag: "🇵🇬" },
    "PY": { countryFullname: "Paraguay", countryFlag: "🇵🇾" },
    "PE": { countryFullname: "Peru", countryFlag: "🇵🇪" },
    "PH": { countryFullname: "Philippines", countryFlag: "🇵🇭" },
    "PN": { countryFullname: "Pitcairn", countryFlag: "🇵🇳" },
    "PL": { countryFullname: "Poland", countryFlag: "🇵🇱" },
    "PT": { countryFullname: "Portugal", countryFlag: "🇵🇹" },
    "PR": { countryFullname: "Puerto Rico", countryFlag: "🇵🇷" },
    "QA": { countryFullname: "Qatar", countryFlag: "🇶🇦" },
    "RE": { countryFullname: "Réunion", countryFlag: "🇷🇪" },
    "RO": { countryFullname: "Romania", countryFlag: "🇷🇴" },
    "RU": { countryFullname: "Russian Federation", countryFlag: "🇷🇺" },
    "RW": { countryFullname: "Rwanda", countryFlag: "🇷🇼" },
    "BL": { countryFullname: "Saint Barthélemy", countryFlag: "🇧🇱" },
    "SH": { countryFullname: "Saint Helena", countryFlag: "🇸🇭" },
    "KN": { countryFullname: "Saint Kitts and Nevis", countryFlag: "🇰🇳" },
    "LC": { countryFullname: "Saint Lucia", countryFlag: "🇱🇨" },
    "MF": { countryFullname: "Saint Martin (French part)", countryFlag: "🇲🇫" },
    "PM": { countryFullname: "Saint Pierre and Miquelon", countryFlag: "🇵🇲" },
    "VC": { countryFullname: "Saint Vincent and the Grenadines", countryFlag: "🇻🇨" },
    "WS": { countryFullname: "Samoa", countryFlag: "🇼🇸" },
    "SM": { countryFullname: "San Marino", countryFlag: "🇸🇲" },
    "ST": { countryFullname: "Sao Tome and Principe", countryFlag: "🇸🇹" },
    "SA": { countryFullname: "Saudi Arabia", countryFlag: "🇸🇦" },
    "SN": { countryFullname: "Senegal", countryFlag: "🇸🇳" },
    "RS": { countryFullname: "Serbia", countryFlag: "🇷🇸" },
    "SC": { countryFullname: "Seychelles", countryFlag: "🇸🇨" },
    "SL": { countryFullname: "Sierra Leone", countryFlag: "🇸🇱" },
    "SG": { countryFullname: "Singapore", countryFlag: "🇸🇬" },
    "SX": { countryFullname: "Sint Maarten (Dutch part)", countryFlag: "🇸🇽" },
    "SK": { countryFullname: "Slovakia", countryFlag: "🇸🇰" },
    "SI": { countryFullname: "Slovenia", countryFlag: "🇸🇮" },
    "SB": { countryFullname: "Solomon Islands", countryFlag: "🇸🇧" },
    "SO": { countryFullname: "Somalia", countryFlag: "🇸🇴" },
    "ZA": { countryFullname: "South Africa", countryFlag: "🇿🇦" },
    "GS": { countryFullname: "South Georgia and the South Sandwich Islands", countryFlag: "🇬🇸" },
    "SS": { countryFullname: "South Sudan", countryFlag: "🇸🇸" },
    "ES": { countryFullname: "Spain", countryFlag: "🇪🇸" },
    "LK": { countryFullname: "Sri Lanka", countryFlag: "🇱🇰" },
    "SD": { countryFullname: "Sudan", countryFlag: "🇸🇩" },
    "SR": { countryFullname: "Suriname", countryFlag: "🇸🇷" },
    "SJ": { countryFullname: "Svalbard and Jan Mayen", countryFlag: "🇸🇯" },
    "SE": { countryFullname: "Sweden", countryFlag: "🇸🇪" },
    "CH": { countryFullname: "Switzerland", countryFlag: "🇨🇭" },
    "SY": { countryFullname: "Syria", countryFlag: "🇸🇾" },
    "TW": { countryFullname: "Taiwan", countryFlag: "🇹🇼" },
    "TJ": { countryFullname: "Tajikistan", countryFlag: "🇹🇯" },
    "TZ": { countryFullname: "Tanzania", countryFlag: "🇹🇿" },
    "TH": { countryFullname: "Thailand", countryFlag: "🇹🇭" },
    "TL": { countryFullname: "Timor-Leste", countryFlag: "🇹🇱" },
    "TG": { countryFullname: "Togo", countryFlag: "🇹🇬" },
    "TK": { countryFullname: "Tokelau", countryFlag: "🇹🇰" },
    "TO": { countryFullname: "Tonga", countryFlag: "🇹🇴" },
    "TT": { countryFullname: "Trinidad and Tobago", countryFlag: "🇹🇹" },
    "TN": { countryFullname: "Tunisia", countryFlag: "🇹🇳" },
    "TM": { countryFullname: "Turkmenistan", countryFlag: "🇹🇲" },
    "TC": { countryFullname: "Turks and Caicos Islands", countryFlag: "🇹🇨" },
    "TV": { countryFullname: "Tuvalu", countryFlag: "🇹🇻" },
    "TR": { countryFullname: "Türkiye", countryFlag: "🇹🇷" },
    "UG": { countryFullname: "Uganda", countryFlag: "🇺🇬" },
    "UA": { countryFullname: "Ukraine", countryFlag: "🇺🇦" },
    "AE": { countryFullname: "United Arab Emirates", countryFlag: "🇦🇪" },
    "GB": { countryFullname: "United Kingdom", countryFlag: "🇬🇧" },
    "US": { countryFullname: "United States of America", countryFlag: "🇺🇸" },
    "UM": { countryFullname: "United States Minor Outlying Islands", countryFlag: "🇺🇸" },
    "UY": { countryFullname: "Uruguay", countryFlag: "🇺🇾" },
    "UZ": { countryFullname: "Uzbekistan", countryFlag: "🇺🇿" },
    "VU": { countryFullname: "Vanuatu", countryFlag: "🇻🇺" },
    "VE": { countryFullname: "Venezuela", countryFlag: "🇻🇪" },
    "VN": { countryFullname: "Vietnam", countryFlag: "🇻🇳" },
    "VG": { countryFullname: "Virgin Islands, British", countryFlag: "🇻🇬" },
    "VI": { countryFullname: "Virgin Islands, U.S.", countryFlag: "🇻🇮" },
    "WF": { countryFullname: "Wallis and Futuna", countryFlag: "🇼🇫" },
    "EH": { countryFullname: "Western Sahara", countryFlag: "🇪🇭" },
    "YE": { countryFullname: "Yemen", countryFlag: "🇾🇪" },
    "ZM": { countryFullname: "Zambia", countryFlag: "🇿🇲" },
    "ZW": { countryFullname: "Zimbabwe", countryFlag: "🇿🇼" }
};

function getCountryInfo(countryCode) {
    // Look up the country information
    const countryInfo = countryInfoData[countryCode];

    // Return an object with properties like fullname and flag
    if (countryInfo) {
        return countryInfo;
    }
}



module.exports = { getCountryInfo, countryInfoData };