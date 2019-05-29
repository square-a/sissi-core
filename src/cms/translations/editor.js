/* eslint-disable quotes */
export const IMAGE_SELECT = 'translations/editor/selectImage';
export const IMAGE_PASTE_IN_EDITOR = 'translations/editor/pasteImage';
export const IMAGE_UPLOAD = 'translations/editor/uploadImage';
export const INDEX_HINT = 'translations/editor/indexHint';
export const PAGE = 'translations/editor/page';
export const PAGE_NEW = 'translations/editor/newPage';
export const SECTION = 'translations/editor/section';
export const SECTION_NEW = 'translations/editor/newSection';

export default {
  [IMAGE_SELECT]: [
    "Choose an image",
    "Bild auswählen",
  ],
  [IMAGE_PASTE_IN_EDITOR]: [
    /* eslint-disable no-template-curly-in-string */
    "Please copy this line and paste it in your content:\n![](/images/${image})",
    "Bitte kopiere die folgende Zeile, um das Bild einzufügen:\n![](/images/${image})",
    /* eslint-enable no-template-curly-in-string */
  ],
  [IMAGE_UPLOAD]: [
    "Upload new image",
    "Neues Bild hochladen",
  ],
  [INDEX_HINT]: [
    "The path for the index page can not be edited",
    "Der Pfad für die Startseite kann nicht geändert werden",
  ],
  [PAGE]: [
    "Page",
    "Seite",
  ],
  [PAGE_NEW]: [
    "New Page",
    "Neue Seite",
  ],
  [SECTION]: [
    "Section",
    "Abschnitt",
  ],
  [SECTION_NEW]: [
    "New Section",
    "Neuer Abschnitt",
  ],
};
