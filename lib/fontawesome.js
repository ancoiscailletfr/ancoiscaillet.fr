import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
  faCheckCircle,
  faClock,
  faDatabase,
  faDiagnoses,
  faEnvelope,
  faExternalLinkAlt,
  faFilePdf,
  faGraduationCap,
  faHandshake,
  faHandsHelping,
  faLaptop,
  faLightbulb,
  faMapMarkedAlt,
  faMapPin,
  faMinus,
  faMobileAlt,
  faPalette,
  faPlus,
  faSearch,
  faShareAlt,
  faSpinner,
  faStreetView,
  faTablet,
  faTimes,
  faTimesCircle,
  faTv,
  faUsers,
  faWater
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(faCopyright, faShareAlt, faTimes, faCheckCircle, faSpinner, faEnvelope, faExternalLinkAlt, faMapMarkedAlt,
  faDatabase, faHandshake, faMobileAlt, faUsers, faTablet, faLaptop, faTv, faMapPin, faPlus, faMinus, faFilePdf,
  faTimesCircle, faDiagnoses, faStreetView, faPalette, faGraduationCap, faHandsHelping, faLightbulb, faWater, faSearch,
  faClock, faAngleRight, fab)
