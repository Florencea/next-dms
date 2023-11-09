import dayjs from "dayjs";

const useRender = () => {
  const renderText = (content?: string | number | null) =>
    ["string", "number"].includes(typeof content) ? `${content}` : "-";
  const renderDate = (content?: string | number | null) => {
    const contentDate = dayjs(`${content}`);
    if (contentDate.isValid()) {
      return contentDate.format("YYYY-MM-DD HH:mm:ss");
    } else {
      return "-";
    }
  };
  return { renderText, renderDate };
};

export default useRender;
