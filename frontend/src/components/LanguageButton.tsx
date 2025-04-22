import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function LanguageButton() {
  // const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Languages strokeWidth={2} />
          <span className='sr-only'>Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-0 w-28'>
        {/* <DropdownMenuItem onClick={() => i18n.changeLanguage("zh")}>{t("简体中文")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>{t("English")}</DropdownMenuItem> */}
        <DropdownMenuItem>{"简体中文"}</DropdownMenuItem>
        <DropdownMenuItem>{"English"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
