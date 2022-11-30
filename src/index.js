import $ from "jquery";
import { openConnection } from './sockets';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { initRouter } from "./router";

$(() => {
  initRouter();
});

openConnection();
