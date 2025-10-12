import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";






Dropzone.autoDiscover = false;
const profile = new Dropzone("#user-photo", {
  url: "#",
  autoProcessQueue: false,
  maxFiles: 1,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: " عکس کاربر را وارد کنید",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
});
