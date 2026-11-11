/** "ĐẠI LÝ PHÂN BÓN" -> "Đại lý phân bón" (sentence case, for CMS text typed in caps). */
export const sentenceCase = (s: string) => {
  const t = s.trim().toLocaleLowerCase("vi");
  return t.charAt(0).toLocaleUpperCase("vi") + t.slice(1);
};

/** "KIM NGOAN" -> "Kim Ngoan". */
export const titleCase = (s: string) => s.trim().toLocaleLowerCase("vi").replace(/(^|\s)\S/g, (c) => c.toLocaleUpperCase("vi"));

/** "Cây cà phê" -> "cà phê" – used to build crop search queries. */
export const cropQuery = (name: string) => name.replace(/^cây\s+/i, "");
