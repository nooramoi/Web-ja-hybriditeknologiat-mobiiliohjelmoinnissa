export function convertFirebaseTimeStampToJS(timestamp) {
    const jsDate = timestamp.toDate();
    return jsDate.toString();
  }
  