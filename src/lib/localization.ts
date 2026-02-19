export interface LocalizedString {
  de: string;
  en: string;
}

export const getLocalizedTextKey = (value: LocalizedString | string) =>
  typeof value === "string" ? value : `${value.en}-${value.de}`;

export const translateLocalizedString = (text: LocalizedString, language: "de" | "en") => text[language];
