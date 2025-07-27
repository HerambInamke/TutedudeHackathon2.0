import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="te">తెలుగు</option>
      <option value="mr">मराठी</option>
      <option value="ta">தமிழ்</option>
      <option value="gu">ગુજરાતી</option>
      <option value="bn">বাংলা</option>
    </select>
  );
}