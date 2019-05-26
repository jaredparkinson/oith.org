import { getElementAttribute } from './functions/browser/getElementAttribute';
export async function getID(
  document: Document,
  language: string,
): Promise<string> {
  return `${getElementAttribute(
    document,
    'html',
    'data-uri',
    new RegExp(new RegExp(/(?!\\)[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/g)),
  ).replace(/\//g, '-')}-${language}`;
}
