async function saveImage(videoId, imgUrl, imgText, ytLink, timestamp, videoHeading) {
    const data = await chrome.storage.local.get(["userData"]);
    const previousData = data.userData;
    const updatedAt = JSON.stringify(new Date());
    if (previousData) {
        const previousVideoData = previousData[videoId];
        let updatedData;
        if (previousVideoData) {
            const sortedData = [...previousData[videoId].data, { imgUrl, imgText, ytLink, timestamp }].sort((a, b) => a.timestamp - b.timestamp);
            updatedData = {
                ...previousData,
                [videoId]: {
                    heading: videoHeading,
                    data: sortedData,
                    updatedAt
                }
            };
        } else {
            updatedData = {
                ...previousData,
                [videoId]: {
                    heading: videoHeading,
                    data: [{ imgUrl, imgText, ytLink, timestamp }],
                    updatedAt
                }
            };
        }
        chrome.storage.local.set({ userData: updatedData }).then(() => {
            const drawingSection = document.getElementById('drawing-section');
            if (drawingSection) {
                drawingSection.remove();
            }
        }).catch((e) => {
            console.log("error in updating userData", e)
        })
    } else {
        chrome.storage.local.set({
            userData: {
                [videoId]: {
                    heading: videoHeading,
                    data: [{ imgUrl, imgText, ytLink, timestamp }],
                    updatedAt
                }
            }
        }).then(() => {
            const drawingSection = document.getElementById('drawing-section');
            if (drawingSection) {
                document.body.removeChild(drawingSection);
            }
        }).catch((e) => {
            console.log("error in updating userData", e)
        })
    }
}
let getPlayingScreenshot = () => {
    let video = document.getElementsByTagName('video')[0];
    if (video) {
        const REDUCE_RATIO = 1;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        ctx.canvas.toBlob((blob) => {
            const newFile = new File([blob], 'testing', {
                type: 'image/jpeg',
                lastModified: Date.now(),
            });
            const reader2 = new FileReader();
            reader2.addEventListener('loadend', async (e) => {
                const currentLocation = window.location.href;
                const queryParameters = currentLocation.split("?")[1];
                const urlParameters = new URLSearchParams(queryParameters);
                let currentVideo = urlParameters.get("v");
                let currentList = urlParameters.get("list");
                let currentIndex = urlParameters.get('index');

                const newFileSrc = e.target.result;
                const timestamp = document.getElementsByTagName('video')[0].currentTime;
                const Note = await TOAST('Screenshot Captured', 3);
                const videoTitle = document.querySelector('#above-the-fold yt-formatted-string').textContent;
                if (videoTitle) {
                    let VideoLink;
                    if (currentList) {
                        if (currentIndex) {
                            VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + currentIndex + "&t=" + timestamp + "s"
                        } else {
                            const firstIndex = 1;
                            VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + firstIndex + "&t=" + timestamp + "s"
                        }
                    } else {
                        VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&t=" + timestamp + "s"
                    }
                    await saveImage(currentVideo, newFileSrc, Note, VideoLink, timestamp, videoTitle);
                }
            });
            reader2.readAsDataURL(newFile);
        }, 'image/jpeg', REDUCE_RATIO);
    }
}
let getEditScreenshot = () => {
    return new Promise((resolve, reject) => {
        let video = document.getElementsByTagName('video')[0];
        if (!video) {
            reject("No video element found");
            return;
        }

        const REDUCE_RATIO = 1;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        ctx.canvas.toBlob((blob) => {
            const newFile = new File([blob], 'testing', {
                type: 'image/jpeg',
                lastModified: Date.now(),
            });
            const reader2 = new FileReader();
            reader2.addEventListener('loadend', async (e) => {
                const newFileSrc = e.target.result;
                resolve(newFileSrc);
            });
            reader2.readAsDataURL(newFile);
        }, 'image/jpeg', REDUCE_RATIO);
    });
}
async function TOAST(message, duration) {
    return new Promise(resolve => {
        const Toast = document.createElement('div');
        Toast.style.position = "absolute";
        Toast.id = "soltoast";
        Toast.style.top = "80px";
        Toast.style.right = "10px";
        Toast.style.backgroundColor = "black";
        Toast.style.color = "white";
        Toast.style.padding = "10px";
        Toast.style.borderRadius = "10px";
        Toast.style.zIndex = "999999999999999990000";

        const ToastHeader = document.createElement('div');
        ToastHeader.style.display = "flex";
        ToastHeader.style.justifyContent = "space-between";
        ToastHeader.style.alignItems = "center";
        ToastHeader.style.marginBottom = "10px";

        const ToastMessage = document.createElement('div');
        ToastMessage.innerHTML = message;
        ToastMessage.style.margin = "auto";
        ToastHeader.appendChild(ToastMessage);

        const CloseButton = document.createElement('button');
        CloseButton.innerHTML = 'X';
        CloseButton.style.backgroundColor = "black";
        CloseButton.style.color = "white";
        CloseButton.style.border = "none";
        CloseButton.style.borderRadius = "50%";
        CloseButton.style.width = "20px";
        CloseButton.style.height = "20px";
        CloseButton.style.display = "flex";
        CloseButton.style.justifyContent = "center";
        CloseButton.style.alignItems = "center";
        CloseButton.onclick = () => {
            if (document.getElementById('movie_player').contains(Toast)) {
                document.getElementById('movie_player').removeChild(Toast);
                document.getElementsByTagName('video')[0].play();
                resolve(ToastInNote.value);
            }
        }
        ToastHeader.appendChild(CloseButton);
        Toast.appendChild(ToastHeader);

        const ToastInNote = document.createElement('textarea');
        ToastInNote.id = "ToastInNote";
        ToastInNote.onkeydown = (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                if (document.getElementById('movie_player').contains(Toast)) {
                    document.getElementById('movie_player').removeChild(Toast);
                    document.getElementsByTagName('video')[0].play();
                    clearTimeout(timeout);
                    resolve(ToastInNote.value);
                }
            } else {
                document.getElementsByTagName('video')[0].pause();
                clearTimeout(timeout);
            }
            e.stopPropagation();
            e.stopImmediatePropagation();
        };
        ToastInNote.onkeyup = (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
        };
        ToastInNote.style.backgroundColor = "black";
        ToastInNote.style.color = "white";
        ToastInNote.style.padding = "10px";
        ToastInNote.style.borderRadius = "10px";
        ToastInNote.style.zIndex = "10000";
        ToastInNote.placeholder = 'Add a note';
        Toast.appendChild(ToastInNote);

        const timeout = setTimeout(() => {
            if (document.getElementById('movie_player').contains(Toast)) {
                document.getElementById('movie_player').removeChild(Toast);
                resolve(ToastInNote.value);
            }
        }, 1000 * duration);


        document.getElementById('movie_player').appendChild(Toast);
        ToastInNote.focus();

        // Click event listener to detect clicks outside the toast
        document.getElementsByTagName('video')[0].addEventListener('click', (event) => {
            const arr = document.getElementById('soltoast');
            if (arr != null && arr != undefined && arr.contains(event.target) == false) {
                event.stopPropagation();
                document.getElementsByTagName('video')[0].play();
                if (document.getElementById('movie_player').contains(Toast)) {
                    document.getElementById('movie_player').removeChild(Toast);
                    resolve(ToastInNote.value);
                }
            }
        });
    });
}
async function handleKeyDown(e, videoId) {
    await keyBindings(e, videoId);
}
function addCaptureButton() {
    let captureButton = document.getElementById('Frametagger-capture');
    if (captureButton) {
        captureButton.remove();
    }
    const button = document.createElement('button');
    button.innerHTML = `<svg width="32px" height="51px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / Note_Edit"> <path id="Vector" d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
    button.id = 'Frametagger-capture';
    button.addEventListener('click', () => {
        getPlayingScreenshot();
    });
    button.classList.add('ytp-button');
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.onmousedown = () => {
        button.style.scale = '0.9';
    }
    button.onmouseup = () => {
        button.style.scale = '1';
    }

    let LeftControls = document.querySelector('.ytp-right-controls');
    if (LeftControls) {
        LeftControls.prepend(button);
    }
}
async function keyBindings(e, currentVideo) {
    if (e.key === 'b' && e.ctrlKey) {
        getPlayingScreenshot(currentVideo);
    } else if (e.key === 'i' && e.ctrlKey) {
        document.getElementsByTagName('video')[0].pause();
        const section = document.createElement('section');
        section.id = "drawing-section";
        section.style.position = "absolute";
        section.style.overflow = "hidden";
        section.style.top = "0";
        section.style.zIndex = '99999999999';
        section.style.left = "50%";
        section.style.transform = "translateX(-50%)";
        section.style.height = "100%";
        section.display = "flex";


        const toolbar = document.createElement('div');
        toolbar.style.display = "flex";
        toolbar.style.gap = "20px";
        toolbar.style.justifyContent = "center";
        toolbar.style.alignItems = 'center';
        toolbar.style.position = "absolute";
        toolbar.style.top = "0";
        toolbar.style.left = "0";
        toolbar.style.width = "100%";
        toolbar.style.padding = "5px";
        toolbar.style.backgroundColor = 'transparent'; 
        
        const PencilEdit = document.createElement('button');
        PencilEdit.id = "pencil";
        PencilEdit.innerHTML = `<svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z" fill="#000000"></path> </g></svg>`;
        toolbar.appendChild(PencilEdit);

        const RectShape = document.createElement('button');
        RectShape.id = "rectShape";
        RectShape.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> </g></svg>`;
        toolbar.appendChild(RectShape);

        const ArrowShape = document.createElement('button');
        ArrowShape.id = "arrowShapeContainer";
        ArrowShape.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z" fill="#000000"></path> </g></svg>`;
        toolbar.appendChild(ArrowShape);

        const TxtButton = document.createElement('button');
        TxtButton.id = "txt";
        TxtButton.innerHTML = `<svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 189.127 189.127" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#222220;" d="M177.688,0H11.438c-4.143,0-7.5,3.358-7.5,7.5v46.23c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V15 h68.125v159.127H62.688c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h63.75c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-24.375 V15h68.125v38.73c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V7.5C185.188,3.358,181.831,0,177.688,0z"></path> </g></svg>`;
        toolbar.appendChild(TxtButton);

        const Line = document.createElement('button');
        Line.id = "line";
        Line.innerHTML = `<svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.293,20.707a1,1,0,0,1,0-1.414l16-16a1,1,0,1,1,1.414,1.414l-16,16A1,1,0,0,1,3.293,20.707Z"></path></g></svg>`
        toolbar.appendChild(Line);

        const GetButton = document.createElement('button');
        GetButton.id = "get";
        GetButton.innerHTML = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 352.62 352.62" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664 c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648 c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704 c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145 C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611 c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"></path> </g> </g></svg>`;

        GetButton.style.cursor = "pointer";
        GetButton.addEventListener('mousedown', function () {
            GetButton.style.scale = '0.9';
        });
        GetButton.addEventListener('mouseup', function () {
            GetButton.style.scale = '1';
        }
        );
        toolbar.appendChild(GetButton);

        section.appendChild(toolbar);

        const drawingBoard = document.createElement('div');
        drawingBoard.classList.add('drawing-board');
        const canvas = document.createElement('canvas');
        canvas.id = "drawing-board";

        drawingBoard.appendChild(canvas);
        section.appendChild(drawingBoard);

        const ctx = canvas.getContext('2d');

        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;
        const body = document.body;
        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;

        var background = new Image();
        background.src = await getEditScreenshot();

        // Make sure the image is loaded first otherwise nothing will draw.
        background.onload = function () {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }

        let isPainting = false;
        let startX;
        let startY;
        let pencilWidth = '2', rectWidth = '2', txtWidth = '12', arrowWidth = '2', lwidth = '2'; 
        let pencilColor = 'black', rectColor = 'black', txtColor = 'black', arrowColor = 'black', lColor = 'black';

        GetButton.addEventListener('click', e => {
            const REDUCE_RATIO = 1;
            ctx.canvas.toBlob((blob) => {
                const newFile = new File([blob], 'testing', {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                });
                const reader2 = new FileReader();
                reader2.addEventListener('loadend', async (e) => {
                    const currentLocation = window.location.href;
                    const queryParameters = currentLocation.split("?")[1];
                    const urlParameters = new URLSearchParams(queryParameters);
                    let currentVideo = urlParameters.get("v");
                    let currentList = urlParameters.get("list");
                    let currentIndex = urlParameters.get('index');
                    GetButton.innerHTML = "Loading...."
                    const newFileSrc = e.target.result;
                    const timestamp = document.getElementsByTagName('video')[0].currentTime;
                    const videoTitle = document.querySelector('#above-the-fold yt-formatted-string').textContent;
                    let VideoLink;
                    if (videoTitle) {
                        if (currentList) {
                            if (currentIndex) {
                                VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + currentIndex + "&t=" + timestamp + "s";
                            } else {
                                const firstIndex = 1;
                                VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + firstIndex + "&t=" + timestamp + "s"
                            }
                        } else {
                            VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&t=" + timestamp + "s"
                        }
                        await saveImage(currentVideo, newFileSrc, "", VideoLink, timestamp, videoTitle);
                    }
                    GetButton.innerHTML = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 352.62 352.62" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664 c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648 c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704 c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145 C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611 c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"></path> </g> </g></svg>`;
                    document.getElementsByTagName('video')[0].play();
                });
                reader2.readAsDataURL(newFile);
            }, 'image/jpeg', REDUCE_RATIO);

            // ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        const eventMap = new WeakMap();

        function addTrackedEventListener(element, type, listener, options) {
            element.addEventListener(type, listener, options);
            if (!eventMap.has(element)) {
                eventMap.set(element, []);
            }
            eventMap.get(element).push({ type, listener, options });
        };

        function removeEvent(element, type) {
            if (!eventMap.has(element)) return false;

            const listeners = eventMap.get(element);

            const index = listeners.findIndex(listenerObj => listenerObj.type === type);

            if (index !== -1) {
                const obj = listeners[index];

                element.removeEventListener(obj.type, obj.listener);

                listeners.splice(index, 1);
                
                if (listeners.length === 0) {
                    eventMap.delete(element);
                }
            }
        };
        
        function setWidthAndColor(top, left, height,getWidthandColor, setWidthandColor) {
            let controlContainer = document.getElementById('controlContainer');
            
            if(controlContainer) {
                controlContainer.remove();
            }
            
            controlContainer = document.createElement('div');
            controlContainer.id = 'controlContainer';
            controlContainer.style.display = 'flex';
            controlContainer.style.alignItems = 'center';
            controlContainer.style.position = 'absolute';
            controlContainer.style.top = `${top + height + 2}px`;
            controlContainer.style.left = `${left}px`;
            controlContainer.style.backgroundColor = '#f0f0f0';
            controlContainer.style.padding = '5px';
            controlContainer.style.borderRadius = '5px';
            controlContainer.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
            
            const ColorInput = document.createElement('input');
            ColorInput.type = "color";
            ColorInput.id = "stroke";
            ColorInput.style.width = "30px";
            ColorInput.value = getWidthandColor("color");
            ColorInput.style.margin= "5px";
            addTrackedEventListener(ColorInput, 'input', (e) => {
                setWidthandColor(e);
            })
            controlContainer.appendChild(ColorInput);
        
            const LineWidth = document.createElement('input');
            LineWidth.id = "lineWidth";
            LineWidth.type = "number";
            LineWidth.style.width = "30px";
            LineWidth.value = getWidthandColor("width");
            LineWidth.style.margin = "5px";
            addTrackedEventListener(LineWidth, 'input', (e) => {
                setWidthandColor(e);
            })
            controlContainer.appendChild(LineWidth);
    
            toolbar.appendChild(controlContainer);
        };



        PencilEdit.addEventListener('click', (e) => {
            canvas.style.cursor = 'crosshair';

            setWidthAndColor(PencilEdit.offsetTop, PencilEdit.offsetLeft, PencilEdit.offsetHeight,     
                (attribute) => {return attribute === "width" ? pencilWidth : pencilColor},   // Getter function
                (event) => { event.target.id === "lineWidth" ? pencilWidth = event.target.value : pencilColor = event.target.value; } // Setter function 
            );

            const start = (e) => {
                isPainting = true;
                startX = e.clientX;
                startY = e.clientY;
                ctx.beginPath();
            };
            const draw = (e) => {
                if (!isPainting) {
                    return;
                }

                ctx.lineWidth = pencilWidth;
                ctx.strokeStyle = pencilColor;
                ctx.lineCap = 'round';

                ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
                ctx.stroke();
            };

            const end = e => {
                isPainting = false;
                ctx.stroke();
            };

            removeEvent(canvas, "mousedown");
            addTrackedEventListener(canvas, "mousedown", start);

            removeEvent(canvas, "mousemove");
            addTrackedEventListener(canvas, "mousemove", draw);

            removeEvent(canvas, "mouseup");
            addTrackedEventListener(canvas, "mouseup", end);
        });

        RectShape.addEventListener('click', (e) => {
            isPainting = false;
            let  width, height, rect = null;
            canvas.style.cursor = 'crosshair';
            drawingBoard.style.cursor = "crosshair";
            

            setWidthAndColor(RectShape.offsetTop, RectShape.offsetLeft, RectShape.offsetHeight,     
                (attribute) => {return attribute === "width" ? rectWidth : rectColor},
                (event) => { event.target.id === "lineWidth" ? rectWidth = event.target.value : rectColor = event.target.value; }
            );
            const createRect = (e) => {
                isPainting = true;
                startX = e.clientX;
                startY = e.clientY;

                if (!rect){

                    rect = document.createElement('div');
                    rect.className = 'rectangle';
                    rect.style.position = 'absolute';
                    rect.style.border = `${rectWidth}px solid ${rectColor}`;
                    rect.style.left = `${startX}px`;
                    rect.style.top = `${startY}px`;
                    
                    drawingBoard.appendChild(rect);
                        
                };
                
            };

            const setRectDimension = (e) => {
                if (isPainting) {
                    const currentX = e.offsetX;
                    const currentY = e.offsetY;

                    width = currentX - startX;
                    height = currentY - startY;

                    if (width < 0) {
                        rect.style.left = `${currentX}px`;
                        rect.style.width = `${-width}px`;
                    } else {
                        rect.style.left = `${startX}px`;
                        rect.style.width = `${width}px`;
                    }

                    if (height < 0) {
                        rect.style.top = `${currentY}px`;
                        rect.style.height = `${-height}px`;
                    } else {
                        rect.style.top = `${startY}px`;
                        rect.style.height = `${height}px`;
                    }
                }
            }

            const drawRectOnCanvas = e => {
                isPainting = false;
                if (rect){
                   rect.remove();
                   rect = null;
                }
                ctx.beginPath();
                ctx.lineWidth = rectWidth;
                ctx.strokeStyle = rectColor;
                ctx.lineCap = "round";
                ctx.strokeRect(startX, startY, width, height);
                width = 0;
                height = 0;
           }
           
           removeEvent(canvas, "mousedown");
           addTrackedEventListener(canvas, "mousedown", createRect);

           removeEvent(canvas, "mousemove");
           addTrackedEventListener(canvas, "mousemove", setRectDimension);

           removeEvent(canvas, "mouseup");
           addTrackedEventListener(drawingBoard, "mouseup", drawRectOnCanvas);
        });

        TxtButton.addEventListener('click', (e) => {
            isPainting = false;
            let txtForm, txtLabel, txt;
            canvas.style.cursor = 'crosshair';
            drawingBoard.style.cursor = "crosshair";
            

            setWidthAndColor(TxtButton.offsetTop, TxtButton.offsetLeft, TxtButton.offsetHeight,     
                (attribute) => {return attribute === "width" ? txtWidth : txtColor},
                (event) => { event.target.id === "lineWidth" ? txtWidth = event.target.value : txtColor = event.target.value; }
            );

            const createTxtInput = (e) => {
                isPainting = true;
                txtForm = document.createElement('form');
                txtLabel = document.createElement('label');
                txt = document.createElement('textarea');
                startX = e.clientX;
                startY = e.clientY;

                txtForm.id = "myForm";
                txtForm.addEventListener('submit', (e) => {
                    let text;
                    const lineHeight = 1 * txtWidth;

                    e.preventDefault();
                    const formData = new FormData(e.target);
                    formData.forEach(value => {
                         text = value.split('\n');
                    });

                    text.forEach(element => {
                        ctx.fillText(element, startX, startY + lineHeight );
                        startY += lineHeight;
                    });
                })

                txt.id = "inputTxt";
                txt.name = "inputTxt";
                txt.wrap = "hard";
                txt.style.resize = "none";
                txt.style.border = "2px solid grey"
                txt.style.fontFamily = "Arial";
                txt.style.fontSize = `${txtWidth < 12 ? 12 : txtWidth}px`;
                txt.style.color = txtColor;
                txt.style.backgroundColor = "transparent";
                txt.style.position = 'absolute';

                txtLabel.htmlFor = "inputTxt";
                
                txtForm.appendChild(txtLabel);
                txtForm.appendChild(txt);
                drawingBoard.appendChild(txtForm);
            };

            const setTxtBoxDimension = (e) => {
                if (isPainting) {

                    const width = e.clientX - startX;
                    const height = e.clientY - startY;
                    
                    txt.style.left = `${startX}px`;
                    txt.style.top = `${startY}px`;
                    txt.style.width = `${width}px`;
                    txt.style.height = `${height}px`;
                }
            };

            const drawTxtOnCanva = () => {
                isPainting = false;

                const addTxtToCanva = (e) => {
                    
                    if (document.getElementById('myForm')) {
                        let value = document.getElementById('inputTxt').value;

                        if(value) {
                            ctx.font = `${txtWidth < 12 ? 12 : txtWidth}px Arial`;
                            ctx.fillStyle = txtColor;
                            document.getElementById('myForm').requestSubmit();
                            document.getElementById('myForm').remove();
                            removeEvent(canvas, "mousedown");
                        } else {
                                document.getElementById('myForm').remove();
                                removeEvent(canvas, "mousedown");
                        }    
                    }
                    
                }
                removeEvent(canvas, "mousedown");
                addTrackedEventListener(canvas, "mousedown", addTxtToCanva);

                addTrackedEventListener(canvas, "mousedown", createTxtInput);
            };
            
            removeEvent(canvas, "mousedown")
            addTrackedEventListener(canvas, "mousedown", createTxtInput);
            
            removeEvent(canvas, "mousemove");
            addTrackedEventListener(canvas, "mousemove", setTxtBoxDimension);
            
            removeEvent(drawingBoard, "mouseup");
            addTrackedEventListener(canvas, "mouseup", drawTxtOnCanva);

        });

        ArrowShape.addEventListener('click' , (e) => {
            let arrowContainer , arrowShaft , arrowHead;
            let endX, endY;
            isPainting =false;
            canvas.style.cursor = 'crosshair';
            drawingBoard.style.cursor = "crosshair";

            setWidthAndColor(ArrowShape.offsetTop, ArrowShape.offsetLeft, ArrowShape.offsetHeight,     
                (attribute) => {return attribute === "width" ? arrowWidth : arrowColor},
                (event) => { event.target.id === "lineWidth" ? arrowWidth = event.target.value : arrowColor = event.target.value; }
            );

            const createArrow = (e) => {
                isPainting = true;

                arrowContainer = document.createElement('div');
                arrowShaft = document.createElement('div');
                arrowHead = document.createElement('div');

                arrowContainer.style.display = "flex";
                arrowContainer.style.alignItems = "center";
                arrowContainer.style.position = "absolute";
                arrowContainer.style.transformOrigin = "top left";

                arrowShaft.style.height = 0;
                arrowShaft.style.width = 0;
                arrowShaft.style.backgroundColor = arrowColor;
                
                arrowHead.style.width = 0;
                arrowHead.style.height = 0;
                
                const distanceTop = arrowShaft.getBoundingClientRect().top - arrowContainer.getBoundingClientRect().top ;
                const distanceLeft = arrowShaft.getBoundingClientRect().left - arrowContainer.getBoundingClientRect().left;

                startX = e.clientX - distanceLeft;
                startY = e.clientY - distanceTop;

                arrowContainer.style.left = `${startX}px`;
                arrowContainer.style.top = `${startY}px`;

                arrowContainer.appendChild(arrowShaft);
                arrowContainer.appendChild(arrowHead);
                drawingBoard.appendChild(arrowContainer);
            };

            const setDimension = (e) => {
                if (isPainting) {

                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);
                
                    arrowHead.style.borderTop = `${arrowWidth * 2}px solid transparent`;
                    arrowHead.style.borderBottom = `${arrowWidth * 2}px solid transparent`;
                    arrowHead.style.borderLeft = `${arrowWidth * 2}px solid ${arrowColor}`;

                    arrowShaft.style.height = `${arrowWidth}px`;
                    arrowShaft.style.width = `${distance}px`;
                
                    arrowContainer.style.transform = `rotate(${angle}rad)`;
                    
                    endX = e.clientX , endY = e.clientY;
                }
            }

            const drawOnCanva = (e) => {
                isPainting = false;
                 if (arrowContainer && arrowShaft && arrowHead && startX && startY && endX && endY){
                    arrowContainer.remove();
                    arrowShaft.remove();
                    arrowHead.remove();
                    drawArrow(startX, startY, endX, endY);
                    endX = null; 
                    endY = null; 
                    startX = null; 
                    startY = null;
                }
            }

            function drawArrow(fromX, fromY, toX, toY) {
                const headLength = 15; 
                const angle = Math.atan2(toY - fromY, toX - fromX);
            
                ctx.lineWidth = `${arrowWidth}`;
                ctx.strokeStyle = `${arrowColor}`;
                ctx.lineCap = "round"

                // Draw the arrow shaft
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.stroke();
                ctx.closePath();
            
                // Draw the arrowhead
                ctx.beginPath();
                ctx.moveTo(toX, toY);
                ctx.lineTo(
                  toX - headLength * Math.cos(angle - Math.PI / 6),
                  toY - headLength * Math.sin(angle - Math.PI / 6)
                );
                ctx.moveTo(toX, toY);
                ctx.lineTo(
                  toX - headLength * Math.cos(angle + Math.PI / 6),
                  toY - headLength * Math.sin(angle + Math.PI / 6)
                );
                ctx.stroke();
                ctx.closePath();
            }

            removeEvent(canvas, "mousedown")
            addTrackedEventListener(canvas, "mousedown", createArrow);

            removeEvent(canvas, "mousemove")
            addTrackedEventListener(canvas, "mousemove", setDimension)

            removeEvent(drawingBoard, "mouseup")
            addTrackedEventListener(drawingBoard, "mouseup", drawOnCanva);
        });


        Line.addEventListener('click' , (e) => {
            let line;
            let endX, endY;
            isPainting =false;
            canvas.style.cursor = 'crosshair';
            drawingBoard.style.cursor = "crosshair";


            setWidthAndColor(Line.offsetTop, Line.offsetLeft, Line.offsetHeight,     
                (attribute) => {return attribute === "width" ? lwidth : lColor},
                (event) => { event.target.id === "lineWidth" ? lwidth = event.target.value : lColor = event.target.value; }
            );
            const createLine = (e) => {
                isPainting = true;
                startX = e.clientX;
                startY = e.clientY;


                line = document.createElement('div');
                
                line.style.position = "absolute";
                line.style.transformOrigin = "top left";
                line.style.height = `${lwidth}px`;
                line.style.left = `${startX}px`;
                line.style.top = `${startY}px`;
                line.style.backgroundColor = lColor;
                drawingBoard.appendChild(line);
            };

            const setLineDimension = (e) => {
                if (isPainting) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);

                    endX = e.clientX , endY = e.clientY;
                

                    line.style.width = `${distance}px`;
                    line.style.transform = `rotate(${angle}rad)`;
                    
                }
            };

            function drawLine(fromX, fromY, toX, toY) {
                ctx.lineWidth = `${lwidth}`;
                ctx.strokeStyle = `${lColor}`;
                ctx.lineCap = "butt";

                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.stroke();
                ctx.closePath();
            };

            const drawLineOnCanva = e => {
                isPainting = false;
                if (line && startX && startY && endX && endY){
                   line.remove();
                   drawLine(startX, startY, endX, endY);
                   endX = null; 
                   endY = null; 
                   startX = null; 
                   startY = null;
               }
            };

            removeEvent(canvas, "mousedown");
            addTrackedEventListener(canvas, "mousedown", createLine);

            removeEvent(canvas, "mousemove");
            addTrackedEventListener(canvas, "mousemove", setLineDimension);

            removeEvent(drawingBoard, "mouseup");
            addTrackedEventListener(drawingBoard, "mouseup", drawLineOnCanva)
        })


        if (!document.getElementById('drawing-section')) {
            document.body.prepend(section);
        }
    }
}


function addFunctionalities() {
    addCaptureButton();
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
}

const interval = setInterval(() => {
    console.log('I am running on clicked');
    let captureButton = document.getElementById('Frametagger-capture');
    if (!captureButton) {
        addFunctionalities();
    } else {
        clearInterval(interval);
    }
}, 1000)
