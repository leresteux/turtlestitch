Morph.fromImageURL = function(url) {
    var m = new Morph();

    m.texture = url;

    m.drawNew = function() {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d');
        context.fillStyle = 'rgba(0,0,0,0)';
        context.fillRect(0, 0, this.width(), this.height());
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    }

    m.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(
            this.cachedTexture,
            0,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    m.drawNew();

    m.setExtent(new Point(m.cachedTexture.width, m.cachedTexture.height));

    return m;
}
