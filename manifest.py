import hashlib
import json
from pathlib import Path
from typing import Any, Iterable

SEPARATOR = b"\x00"
PATH_SEPARATOR = "\x01"

# 非 MasterData 的扁平资源（顶层一个 dict），与 Config/master.json 的 flat_types 对应。
FLAT_TYPES = (
    "names",
    "titles",
)


def traverse(obj: dict[str, Any]) -> Iterable[tuple[str, str]]:
    """逐层 Ordinal 排序展开嵌套 dict。

    与 C# 端 GetHash / GetBundleHash 语义一致：
      - 扁平 dict   -> 直接 yield (key, value)
      - 嵌套 dict   -> 路径用 PATH_SEPARATOR(\x01) 拼接
    """
    for key, value in sorted(obj.items()):
        if isinstance(value, dict):
            for sub_path, sub_value in traverse(value):
                yield f"{key}{PATH_SEPARATOR}{sub_path}", sub_value
        else:
            yield key, value


def obj_hash(obj: dict[str, Any]) -> str:
    """MD5( 各条目 [key\0value\0] 拼接 ) 的小写 hex。

    对齐 C# TranslationCache.ComputeMd5Hex：key\0value\0 顺序拼接，UTF-8 编码。
    """
    md5 = hashlib.md5()
    for key, value in traverse(obj):
        md5.update(key.encode("utf-8"))
        md5.update(SEPARATOR)
        md5.update(value.encode("utf-8"))
        md5.update(SEPARATOR)
    return md5.hexdigest()


def file_hash(path: Path) -> str:
    return obj_hash(json.loads(path.read_text(encoding="utf-8")))


class Manifest:
    STATIC_TYPE = "static"

    def __init__(self, translation_dir: str | Path, language: str = "zh_Hans"):
        self.base_dir = Path(translation_dir)
        self.language = language

    def _file(self, category: str) -> Path:
        return self.base_dir / category / f"{self.language}.json"

    def _scenes_dir(self) -> Path:
        return self.base_dir / "scenes"

    def build(self):
        manifest: dict[str, Any] = {}

        # ── 扁平资源：names / titles（顶层 dict） ───────────────────────
        for t in FLAT_TYPES:
            f = self._file(t)
            if f.exists():
                manifest[t] = file_hash(f)

        # ── 剧情场景：{ sceneId: hash }，对应 Manifest.Scenes ──────────
        scenes_dir = self._scenes_dir()
        if scenes_dir.exists():
            manifest["scenes"] = {
                p.name: file_hash(p / f"{self.language}.json")
                for p in scenes_dir.iterdir()
                if p.is_dir() and (p / f"{self.language}.json").exists()
            }

        # ── MasterData 静态合并包：{ type: { field: { orig: trans } } } ─
        static_file = self._file(self.STATIC_TYPE)
        if static_file.exists():
            manifest[self.STATIC_TYPE] = file_hash(static_file)

        # ── 顶层校验 hash：对所有顶层条目排序后 key\0value\0 拼接 ────────
        manifest["hash"] = obj_hash(manifest)
        return manifest

    def update(self):
        manifest = self.build()

        output = self.base_dir / "manifest" / f"{self.language}.json"
        output.parent.mkdir(parents=True, exist_ok=True)

        output.write_text(
            json.dumps(manifest, ensure_ascii=False, sort_keys=True, indent=4),
            encoding="utf-8",
        )
        print(f"manifest written: {output} (hash={manifest['hash']})")


def main():
    Manifest("translation", "zh_Hans").update()


if __name__ == "__main__":
    main()
