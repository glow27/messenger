import { ErrorComponent } from "../../components/ErrorComponent";
import { Link } from "../../components/Link";

const link = new Link({
  linkText: "Back",
  href: "chat",
});

export const notFoundPage = new ErrorComponent({
  messege: "not found",
  code: "404",
  link,
});
