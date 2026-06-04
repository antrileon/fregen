from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "watermarks" / "options"
OUT = ROOT / "public" / "watermarks" / "outlines"
SHADOWS = ROOT / "public" / "watermarks" / "shadows"
OUT.mkdir(parents=True, exist_ok=True)
SHADOWS.mkdir(parents=True, exist_ok=True)


def make_outline(path: Path) -> None:
    image = Image.open(path).convert("RGB")
    image.thumbnail((1100, 1100))

    gray = ImageOps.grayscale(image)
    gray = ImageOps.autocontrast(gray)

    # Soft structural shadows, similar to the subtle continent shapes in the reference.
    soft = gray.filter(ImageFilter.GaussianBlur(9))
    soft = ImageOps.autocontrast(soft)
    soft = ImageOps.invert(soft)
    soft_alpha = soft.point(lambda p: max(0, min(64, int((p - 70) * 0.45))))

    # Main contour lines.
    edges = gray.filter(ImageFilter.GaussianBlur(1.2)).filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.autocontrast(edges)
    edges = ImageEnhance.Contrast(edges).enhance(2.4)
    edges = edges.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.45))
    edge_alpha = edges.point(lambda p: max(0, min(210, int((p - 22) * 2.1))))

    alpha = Image.composite(edge_alpha, soft_alpha, edge_alpha)
    white = Image.new("RGBA", image.size, (255, 255, 255, 0))
    white.putalpha(alpha)

    out_path = OUT / f"{path.stem}.png"
    white.save(out_path, optimize=True)

    shadow = Image.new("RGBA", image.size, (255, 255, 255, 0))
    shadow_alpha = soft_alpha.filter(ImageFilter.GaussianBlur(2))
    shadow.putalpha(shadow_alpha)
    shadow.save(SHADOWS / f"{path.stem}.png", optimize=True)


for source in sorted(SOURCE.glob("*.jpg")):
    make_outline(source)
    print(f"created {source.stem}.png")
