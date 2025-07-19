import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  prePageTitle?: string;
  preLink?: string;
  hiddenGoBackBtn?: boolean;
}

const Breadcrumb = ({
  pageName,
  prePageTitle = "Dashboard",
  preLink = "/",
  hiddenGoBackBtn = true,
}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {!hiddenGoBackBtn && (
          <Link className="font-medium" href={preLink}>
            <ChevronLeft />
          </Link>
        )}

        <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
          {pageName}
        </h2>
      </div>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href={preLink}>
              {`${prePageTitle} /`}
            </Link>
          </li>
          <li className="font-medium text-blue-500">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
