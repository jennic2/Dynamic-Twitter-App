var users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [
            {
                text: 'I admit to judging books by their cover',
                timestamp: '6/17/2021 00:01:20'
            },
            {
                text: 'Starship to the moon',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'Out on launch pad, engine swap underway',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    },
    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [
            {
                text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Should I start tweeting memes? Let me know in a comment.',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'In 2020, I read a book every hour.',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    },
    user3: {
        userName: '@NicoJC',
        displayName: 'Niccolo Jensen-Connel',
        joinedDate: 'June 2009',
        followingCount: 11,
        followerCount: 8,
        avatarURL: 'assets/my-profile-pic.jpg',
        coverPhotoURL: 'assets/my-cover-photo.jpg',
        tweets: [
            {
                text: 'Why are we still here? Just to get riggidy riggidy rekt?',
                timestamp: '6/17/2024 00:01:20'
            },
            {
                text: 'It is better to be feared than to be loved, if one cannot be both',
                timestamp: '6/16/2024 18:37:12'
            },
            {
                text: 'What is it with these motherfucking snakes in this motherfucking tomb!?',
                timestamp: '6/15/2024 12:11:51'
            },
            {
                text: 'Snakes? Why does it always have to be snakes?!',
                timestamp: '6/15/2024 12:12:51'
            },
            {
                text: 'Snake? Snake?! SNAAAAAAAAAAAAKE?!?!?!',
                timestamp: '6/15/2024 12:13:51'
            }
        ]
    }
};

function numberSimplifier(num) {
    if(num < 1000) {
        return num;
    }
    numDivBy1k = num / 1000;
    if(numDivBy1k > 1 && numDivBy1k < 1000) {
        numDivBy1k = parseFloat(numDivBy1k);
        return `${parseFloat(numDivBy1k.toFixed(2))}k`;
    }
    numDivBy1M = num / 1000000;
    return `${parseFloat(numDivBy1M.toFixed(2))}M`;
}

function timeSince(stringTime) {
    let stringArr = stringTime.split(" ");
    let dateArr = stringArr[0].split("/");
    if(dateArr[0].length === 1) {
        dateArr[0] = "0" + dateArr[0];
    }
    if(dateArr[1].length === 1) {
        dateArr[1] = "0" + dateArr[1];
    }
    let year = dateArr[2];
    let month = dateArr[0];
    let day = dateArr[1];
    let newDateStr = year + "-" + month + "-" + day;
    stringArr[1] = "T" + stringArr[1];
    let newTimeString = newDateStr + stringArr[1];
    const date = new Date(newTimeString);
    const timeSinceInSeconds = ((Date.now() - date.getTime()) / 1000).toFixed();
    if(timeSinceInSeconds < 60) {
        return "1m";
    }
    else if(timeSinceInSeconds < 60 * 60) {
        return `${Math.floor(timeSinceInSeconds / 60)}m`;
    }
    else if(timeSinceInSeconds < 60 * 60 * 24) {
        return `${Math.floor(timeSinceInSeconds / (60 * 60))}h`;
    }
    else {
        let unTwitteredDate = date.toDateString();
        let unTwitteredDateArr = unTwitteredDate.split(" ");
        let TwitterDate = unTwitteredDateArr[1] + " " + unTwitteredDateArr[2] + ", " + unTwitteredDateArr[3];
        return TwitterDate;
    }
}

const searchParams = new URLSearchParams(window.location.search);
let curUser;
if(searchParams.has("user") && users[searchParams.get("user")] !== undefined) {
    curUser = users[searchParams.get("user")];
}
else {
    curUser = users.user1;
}
let userName = curUser.userName;
let displayName = curUser.displayName;
let joinedDate = curUser.joinedDate;
let followingCount = numberSimplifier(curUser.followingCount);
let followerCount = numberSimplifier(curUser.followerCount);
let avatarURL = curUser.avatarURL;
let coverPhotoURL = curUser.coverPhotoURL;
let tweetsArr = curUser.tweets;
let numTweets = numberSimplifier(tweetsArr.length);

let topbarContent = document.querySelector(".topbar-content");
topbarContent.innerHTML = `<span style="display: flex;"><h4>${displayName}&nbsp</h4><img src="assets/Twitter-verified-badge.png" style="width: 20px;"></span>
                           <p>${numTweets} Tweets`;

let coverImage = document.querySelector(".cover-img");
coverImage.innerHTML = `<img src=${coverPhotoURL}>`;

let profileContentImage = document.querySelector(".profile-img");
profileContentImage.src = avatarURL;

let profileContentText = document.querySelector(".profile-content-text");
profileContentText.innerHTML = `<span style="display: flex; text-align: center;">
                                    <h4>${displayName}&nbsp</h4><img src="assets/Twitter-verified-badge.png" style="width: 20px;">
                                </span>
                                <p>${userName}</p>
                                <h5 style="padding-top: 10px; color: #8b8f8b;">📅 Joined ${joinedDate}</h5>
                                <span style="padding-top: 10px; display: flex">
                                    <h5 style="margin-right: 15px">${followingCount}<span style="color: #8b8f8b; font-weight: 600;"> Following</span></h5>
                                    <h5>${followerCount}<span style="color: #8b8f8b; font-weight: 600;"> Followers</span></h5>
                                </span>`;

let tweetsDiv = document.querySelector(".tweets");
let curTweetData = curUser.tweets;
for(let i = 0; i < tweetsArr.length; i++) {
    let curTweet = document.createElement("div");
    curTweet.innerHTML = 
                        `<div class="tweet">
                            <div class="tweet-profile-img-container">
                                <img src="${avatarURL}" class="profile-img profile-img-tweet">
                            </div>
                            <div class="tweet-content-container">
                                <span style="display: flex; text-align: center;">
                                    <h5 style="padding-right: 2px;">${displayName}</h5>
                                    <img src="assets/Twitter-verified-badge.png" style="width: 17px;">
                                    <p style="font-size: 12px; color: #8b8f8b; padding-left: 2px;">${userName} <span style="font-weight: 600;">·</span> ${timeSince(curTweetData[i].timestamp)}</p>
                                </span>
                                <p style="font-size: 14px;">${curTweetData[i].text}</p>
                                <div class="tweet-btns-container">
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/comment.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/retweet-icon.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/heart.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>                        <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/upload-icon.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">
                                    </button>
                                </div>
                            </div>
                        </div>`
    tweetsDiv.appendChild(curTweet);
}





