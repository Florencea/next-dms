import dayjs from "dayjs";

const useRender = () => {
  const renderText = (content?: unknown) => (!!content ? `${content}` : "-");
  const renderDate = (content?: unknown) => {
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
