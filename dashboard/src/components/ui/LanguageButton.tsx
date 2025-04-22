import { Languages } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

export default function LanguageButton() {
  // const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Languages strokeWidth={1.5} />
          <span className='sr-only'>Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-0 w-28'>
        <DropdownMenuItem>简体中文</DropdownMenuItem>
        <DropdownMenuItem>{"English"}</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => i18n.changeLanguage("zh")}>简体中文</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>{t("English")}</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
