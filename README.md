# muvluvgg-translation

Muvluv Girls Garden 简体中文翻译。

## 环境准备

需要 Node.js 18 或更高版本。首次克隆后安装依赖：

```bash
npm install
```

安装依赖时会通过 `prepare` 脚本启用 Husky，无需手动配置 Git Hook。

## 目录结构

```text
translation/
|-- names/zh_Hans.json
|-- static/zh_Hans.json
|-- scenes/<scene-id>/zh_Hans.json
`-- manifest/zh_Hans.json
```

`names` 和 `static` 是单文件翻译，`scenes` 按场景 ID 分目录保存。Manifest 脚本会根据实际目录递归扫描，不需要维护分类列表；新增分类或更深的目录层级也会自动写入 Manifest。

## Manifest

手动生成简体中文 Manifest：

```bash
npm run manifest
```

脚本默认读取 `translation/`，生成 `translation/manifest/zh_Hans.json`。其他参数可通过下面的命令查看：

```bash
node manifest.js --help
```

提交代码时，Husky 的 `pre-commit` Hook 会自动重新生成并暂存 Manifest。翻译文件必须先加入暂存区；如果存在未暂存或未跟踪的翻译文件，Hook 会终止提交，防止 Manifest 与提交内容不一致。

## 本地服务

```bash
npm start
```

服务默认监听 `http://localhost:5000`。翻译文件通过 `/translation/<相对路径>` 访问，例如：

```text
http://localhost:5000/translation/names/zh_Hans.json
http://localhost:5000/translation/scenes/10000101/zh_Hans.json
http://localhost:5000/translation/manifest/zh_Hans.json
```

## MasterData

文件位于 `translation/static/zh_Hans.json`。

内容按照 MasterData 中的类名和属性名组织。原 `titles` 中的翻译已经并入 MasterData，无需单独维护。

```json
{
    "_comment": "MasterData 静态翻译映射配置。tables 的键直接对应 MasterData 中的类名，字段名直接对应该类的 string 属性。部分属性类型不为字符串而是封装类，则用::来取封装类的 string 属性，如果为封装类数组则加上[]::，支持嵌套",
    "_flat_types": "非 MasterData 的扁平静态资源，按 translation/<type>/zh_Hans.json 加载",
    "flat_types": ["names"],
    "tables": {
        "ActuatorMaster": {
            "TabName": true,
            "FullName": true,
            "Description": true
        },
        "ChapterGroupMaster": {
            "Title": true,
            "SubTitle": true,
            "Description": true
        },
        "ChapterMaster": {
            "Title": true,
            "SubTitle": true,
            "Overview": true,
            "Interlude": true
        },
        "CharacterBaseMaster": {
            "Name": true,
            "NameRuby": true,
            "Hobby": true,
            "Description": true,
            "BirthPlace": true,
            "Favorite": true
        },
        "CharacterCockpitMotionMaster": {
            "Name": true
        },
        "CharacterEmotionMaster": {
            "Name": true
        },
        "CharacterMaster": {
            "Name": true
        },
        "CharacterSchoolGroupMaster": {
            "Name": true
        },
        "CharacterSchoolMaster": {
            "Name": true
        },
        "CharacterTeamMaster": {
            "Name": true,
            "Description": true
        },
        "CharacterVoiceMaster": {
            "Name": true
        },
        "CircleBattleBossMaster": {
            "Name": true
        },
        "EnemyMaster": {
            "Name": true
        },
        "EpisodeMaster": {
            "Title": true,
            "SubTitle": true
        },
        "EventGroupMaster": {
            "Name": true
        },
        "EventMaster": {
            "Name": true
        },
        "ExchangeMaster": {
            "Name": true
        },
        "GachaMaster": {
            "Name": true,
            "Description": true
        },
        "GradualMissionGroupMaster": {
            "Title": true
        },
        "HomeBackgroundMaster": {
            "Name": true
        },
        "HomeSoundtrackMaster": {
            "Name": true
        },
        "HomeSpeechMaster": {
            "Speech": true
        },
        "InboxMessageMaster": {
            "Message": true
        },
        "ItemAcquisitionLocationMaster": {
            "Location": true
        },
        "ItemMaster": {
            "Name": true,
            "Description": true
        },
        "LocationMaster": {
            "Name": true
        },
        "LocationNodeMaster": {
            "Name": true
        },
        "LoginBonusMaster": {
            "Name": true
        },
        "MazeBonusMaster": {
            "Name": true,
            "Description": true
        },
        "MazeGuarderMaster": {
            "Affiliation": true,
            "Identification": true,
            "Name": true,
            "Description": true
        },
        "MazeMaster": {
            "Name": true
        },
        "MazeMissionStageMaster": {
            "Name": true,
            "Description": true
        },
        "MazeTuneupDailyLimitGroupMaster": {
            "Name": true
        },
        "MemoryMaster": {
            "Name": true,
            "Description": true
        },
        "MgBattleRankMaster": {
            "Name": true
        },
        "MissionCategoryMaster": {
            "NotificationTitle": true
        },
        "MissionMaster": {
            "Title": true,
            "Description": true
        },
        "MissionStageMaster": {
            "Description": true
        },
        "ModuleGearMaster": {
            "Title": true
        },
        "ModuleMaster": {
            "Name": true
        },
        "OperatingSystemMaster": {
            "Name": true,
            "Description": true
        },
        "OverrideLocationNodeMaster": {
            "Name": true
        },
        "PartyBonusDetailMaster": {
            "Description": true,
            "EffectText": true
        },
        "PerkMaster": {
            "Description": true
        },
        "SceneBranchSelectionMaster": {
            "Answer": true
        },
        "SceneMaster": {
            "Title": true
        },
        "SdCharacterMaster": {
            "Name": true
        },
        "ShopProductMaster": {
            "Name": true,
            "Description": true
        },
        "SimulationMaster": {
            "Name": true
        },
        "SkillMaster": {
            "Name": true,
            "DescriptionTemplates[]::Template": true
        },
        "SnsAccountMaster": {
            "DisplayName": true
        },
        "SnsPostBranchSelectionMaster": {
            "Message": true
        },
        "SnsPostMaster": {
            "Message": true
        },
        "SpoilerAlertMaster": {
            "Text": true
        },
        "SpotAreaMaster": {
            "Name": true,
            "Description": true
        },
        "SpotAreaPointMaster": {
            "Name": true
        },
        "SubscriptionMaster": {
            "Name": true
        },
        "SubscriptionRewardMaster": {
            "Name": true,
            "Description": true
        },
        "TalkMaster": {
            "Title": true
        },
        "TalkMessageMaster": {
            "Message": true
        },
        "ThumbnailFrameMaster": {
            "Name": true,
            "Description": true
        },
        "TrophyMaster": {
            "Name": true,
            "UnlockDescription": true,
            "FlavorText": true
        },
        "TypeEquipmentMaster": {
            "Name": true,
            "Description": true
        },
        "UnlockFunctionMaster": {
            "Name": true,
            "Description": true
        },
        "UnlockFunctionTriggerMaster": {
            "Description": true
        },
        "WorldGroupMaster": {
            "Name": true
        },
        "WorldMaster": {
            "Name": true
        }
    }
}
```
