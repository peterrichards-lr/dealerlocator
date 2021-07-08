import parser from 'fast-xml-parser';
import he from 'he';
import filter from 'lodash.filter';

const xmlParserOptions = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

export const readLocalisedValue = (xml, key, locale) => {
    if (xml == null || xml.trim() === '') {
        return null;
    }
    if (key == null || key.trim() === '') {
        return null;
    }
    const root = parser.parse(xml, xmlParserOptions).root;
    const selectedLocale = locale ? locale : root.attr["@_default-locale"];
    const valueArray = Array.isArray(root[key]) ? root[key] : [ root[key] ];
    const value = filter(valueArray, { attr : { "@_language-id" : selectedLocale } });
    if (value.length > 0) {
        return value[0]["#text"];
    } else if (selectedLocale !== root.attr["@_default-locale"]) {
        const defaultValue = filter(valueArray, { attr : { "@_language-id" : root.attr["@_default-locale"] } });
        if (defaultValue.length > 0) {
            return defaultValue[0]["#text"];
        }
    }
    return null;
};
