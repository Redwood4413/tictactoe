
import { version } from "../package.json";
const programVersionQuery = document.querySelector(".starting-field-wrapper small") as HTMLBodyElement;

if(version) programVersionQuery.innerHTML = version;