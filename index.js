const s3ls = require('s3-ls');
const fs = require('fs');

const createRssBody = (feed) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"
        xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
        <channel>
        <title>${feed.title}</title>
        <itunes:author>${feed.author}</itunes:author>
        <description>${feed.description}</description>
        <itunes:image href="${feed.image}"/>
        <language>${feed.language || 'en-us'}</language>

        ${feed.items.map(createRssRecord).join('\n')}
        </channel>
    </rss>`;
}

const createRssRecord = (item) => {
    return `<item>
    <title>${item.title}</title>
    <description>${item.title}</description>
    <enclosure url="${item.url}" type="audio/mp3"/>
    <guid isPermaLink="false">${item.id}</guid>
    </item>`
}

// S3 Public URL
const ROOT = 'https://NAME.s3.REGION.amazonaws.com';

// Your AWS credentials must be provided locally or as ENV variables
const S3_BUCKET_NAME = 'NAME';
const S3_ROOT = '/';

// Feed metadata
const feedConfig = {
    title: 'TITLE',
    author: 'AUTHOR',
    description: 'DESCRIPTION',
    image: 'LINK TO PUBLIC IMAGE',
    language: 'en-us',
};

(async () => {
    const lister = s3ls({ bucket: S3_BUCKET_NAME });

    const { files } = await lister.ls(S3_ROOT);

    const feed = createRssBody({
        ...feedConfig,
        items: files.map((filename) => ({
            title: filename,
            url: `${ROOT}/${filename}`,
            id: filename,
        }))
    });

    // Upload this output to your S3 bucket and make it public
    // then you can point your podcast app to it as an RSS-feed
    fs.writeFileSync('./feed.xml', feed);
})();