const currentLocation = window.location.href;
const queryParameters = currentLocation.split("?")[1];
const urlParameters = new URLSearchParams(queryParameters);
let currentVideo = urlParameters.get("v");
let ImagesArray = {};

const addImage = async (videoId, imgUrl, imgText, ytlink,ImagesArray) => {


}

let getPlayingScreenshot = (currentVideo) => {
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
                await addImage(currentVideo,newFileSrc,Note,videoTitle);
                if (!ImagesArray[currentVideo]) {
                    ImagesArray[currentVideo] = [];
                }
                if (!ImagesArray.list) {
                    ImagesArray.list = {};
                }
                if (currentList && !ImagesArray.list[currentList]) {
                    ImagesArray.list[currentList] = {};
                }
                const videoTitle = document.querySelector('#above-the-fold yt-formatted-string').textContent;
                if (videoTitle) {
                    if (currentList) {
                        if (currentIndex) {
                            ImagesArray.list[currentList][currentIndex] = currentVideo;
                            const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + currentIndex + "&t=" + timestamp + "s"
                            ImagesArray[currentVideo].push([newFileSrc, VideoLink, Note, videoTitle]);
                        } else {
                            const firstIndex = 1;
                            ImagesArray.list[currentList][firstIndex] = currentVideo;
                            ImagesArray.list[currentList][currentIndex] = currentVideo;
                            const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + firstIndex + "&t=" + timestamp + "s"
                            ImagesArray[currentVideo].push([newFileSrc, VideoLink, Note, videoTitle]);
                        }
                    } else {
                        const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&t=" + timestamp + "s"
                        ImagesArray[currentVideo].push([newFileSrc, VideoLink, Note, videoTitle]);
                    }
                }

                chrome.storage.local.set({ ImagesArray: ImagesArray }).then(() => {
                    console.log("Images array is set now");
                });
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
                //asyncFunctionRunning = true;
                const newFileSrc = e.target.result;
                resolve(newFileSrc);
                //asyncFunctionRunning = false;
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

ImagesArray[currentVideo] = [];
chrome.storage.local.get("ImagesArray").then((result) => {
    if (result.ImagesArray) {
        ImagesArray = { ...result.ImagesArray };
        if (!ImagesArray[currentVideo]) {
            ImagesArray[currentVideo] = [];
        } else {
            ImagesArray[currentVideo] = result.ImagesArray[currentVideo];
        }
    }
});


async function keyBindings(e, currentVideo) {
    if (e.key === 'b' && e.ctrlKey) {
        console.log("this is the key", e.key, e.ctrlKey);
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


        const ColorInput = document.createElement('input');
        ColorInput.type = "color";
        ColorInput.id = "stroke";
        ColorInput.style.width = "50px";
        ColorInput.value = "#000000";
        ColorInput.style.marginBottom = "10px";
        toolbar.appendChild(ColorInput);


        const LineWidth = document.createElement('input');
        LineWidth.id = "lineWidth";
        LineWidth.type = "number";
        LineWidth.style.width = "50px";
        LineWidth.value = '2';
        LineWidth.style.marginBottom = "10px";
        toolbar.appendChild(LineWidth);

        const GetButton = document.createElement('button');
        GetButton.id = "get";
        GetButton.innerHTML = `<svg height="40px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M853.333333 874.666667H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334V234.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h682.666666c46.933333 0 85.333333 38.4 85.333334 85.333334v554.666666c0 46.933333-38.4 85.333333-85.333334 85.333334z" fill="#8CBCD6" /><path d="M746.666667 341.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#B3DDF5" /><path d="M426.666667 341.333333L192 682.666667h469.333333z" fill="#9AC9E3" /><path d="M661.333333 469.333333l-170.666666 213.333334h341.333333z" fill="#B3DDF5" /><path d="M810.666667 810.666667m-213.333334 0a213.333333 213.333333 0 1 0 426.666667 0 213.333333 213.333333 0 1 0-426.666667 0Z" fill="#43A047" /><path d="M768 682.666667h85.333333v256h-85.333333z" fill="#FFFFFF" /><path d="M682.666667 768h256v85.333333H682.666667z" fill="#FFFFFF" /></svg>`;

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

        const screenshotUrl = await getEditScreenshot();
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
        // let lineWidth = 2;
        let startX;
        let startY;

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
                    if (!ImagesArray[currentVideo]) {
                        ImagesArray[currentVideo] = [];
                    }
                    if (!ImagesArray.list) {
                        ImagesArray.list = {};
                    }
                    if (currentList && !ImagesArray.list[currentList]) {
                        ImagesArray.list[currentList] = {};
                    }
                    const videoTitle = document.querySelector('#above-the-fold yt-formatted-string').textContent;
                    if (videoTitle) {
                        if (currentList) {
                            if (currentIndex) {
                                ImagesArray.list[currentList][currentIndex] = currentVideo;
                                const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + currentIndex + "&t=" + timestamp + "s"
                                ImagesArray[currentVideo].push([newFileSrc, VideoLink, "", videoTitle]);
                            } else {
                                const firstIndex = 1;
                                ImagesArray.list[currentList][firstIndex] = currentVideo;
                                ImagesArray.list[currentList][currentIndex] = currentVideo;
                                const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&list=" + currentList + "&index=" + firstIndex + "&t=" + timestamp + "s"
                                ImagesArray[currentVideo].push([newFileSrc, VideoLink, "", videoTitle]);
                            }
                        } else {
                            const VideoLink = 'https://www.youtube.com/watch?v=' + currentVideo + "&t=" + timestamp + "s"
                            ImagesArray[currentVideo].push([newFileSrc, VideoLink, "", videoTitle]);
                        }
                    }

                    chrome.storage.local.set({ ImagesArray: ImagesArray }).then(() => {
                        console.log("Images array is set now");
                        const drawingSection = document.getElementById('drawing-section');
                        document.body.removeChild(drawingSection);
                    });
                    GetButton.innerHTML = `<svg height="40px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M853.333333 874.666667H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334V234.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h682.666666c-46.933333 0-85.333333 38.4-85.333334 85.333334v554.666666c0 46.933333 38.4 85.333333 85.333334 85.333334z" fill="#8CBCD6" /><path d="M746.666667 341.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#B3DDF5" /><path d="M426.666667 341.333333L192 682.666667h469.333333z" fill="#9AC9E3" /><path d="M661.333333 469.333333l-170.666666 213.333334h341.333333z" fill="#B3DDF5" /><path d="M810.666667 810.666667m-213.333334 0a213.333333 213.333333 0 1 0 426.666667 0 213.333333 213.333333 0 1 0-426.666667 0Z" fill="#43A047" /><path d="M768 682.666667h85.333333v256h-85.333333z" fill="#FFFFFF" /><path d="M682.666667 768h256v85.333333H682.666667z" fill="#FFFFFF" /></svg>`;
                    document.getElementsByTagName('video')[0].play();
                });
                reader2.readAsDataURL(newFile);
            }, 'image/jpeg', REDUCE_RATIO);

            // ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        let lineWidth = 2;

        toolbar.addEventListener('change', e => {
            if (e.target.id === 'stroke') {
                ctx.strokeStyle = e.target.value;
            }

            if (e.target.id === 'lineWidth') {
                lineWidth = e.target.value;
            }

        });

        const draw = (e) => {
            if (!isPainting) {
                return;
            }

            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
            ctx.stroke();
        }

        canvas.addEventListener('mousedown', (e) => {
            isPainting = true;
            startX = e.clientX;
            startY = e.clientY;
        });

        canvas.addEventListener('mouseup', e => {
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });

        canvas.addEventListener('mousemove', draw);

        if (!document.getElementById('drawing-section')) {
            document.body.prepend(section);
        }
    }
}

(() => {

    const newVideoLoaded = async (videoId) => {
        let captureButton = document.getElementById('capture');
        if (!captureButton) {
            const button = document.createElement('button');
            button.innerHTML = `<svg width="32px" height="51px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / Note_Edit"> <path id="Vector" d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
            button.id = 'capture';
            button.addEventListener('click', () => {
                getPlayingScreenshot(videoId);
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
    };

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded(videoId);
            document.removeEventListener('keydown', handleKeyDown);
            document.addEventListener('keydown', handleKeyDown);
            chrome.storage.local.get("ImagesArray").then((result) => {
                if (result.ImagesArray) {
                    if (!ImagesArray[videoId]) {
                        ImagesArray[currentVideo] = [];
                    } else {
                        ImagesArray[videoId] = result.ImagesArray[videoId];
                    }
                }
            });
        }
    });
    document.addEventListener('keydown', handleKeyDown);
    async function handleKeyDown(e) {
        await keyBindings(e, currentVideo);
    }
    newVideoLoaded(currentVideo);
})();



