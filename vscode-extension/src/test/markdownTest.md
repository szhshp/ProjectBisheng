---

title: 'SQL Server - Cheatsheet'
---
 

# SQL Server Spreadsheet

 
----------

## Insert and get the inserted ID

 

``` sql
declare @insertedID as table(
    ID int
)
 
insert into table1
output INSERTED.id into @insertedID
select ID
from table2
```

 
----------

## Date Format

 

``` 
SELECT FORMAT (getdate(), 'd', 'es-bo') as date
 
SELECT FORMAT (getdate(), 'dd/MM/yyyy ') as date |
```

 
然后字符串部分可以写各种格式

## String Replace

以下示例使用 xxx 替换 abcdefghi 中的字符串 cde.

``` 
SELECT REPLACE('abcdefghicde','cde','xxx'); 
```

----------

## Convert 1 column to string and cut by comma 

 
根据某个表 group 并用逗号分割

``` 
select orgname, Stuff(
    (
 
        -- Main select statement
        SELECT ',' + location
        FROM qryorgsite b
  where b.orgname = a.orgname
 
        -- Main select statement
 
        FOR XML PATH('')
    ), 1, 2, '') as siteList 
 from    org a
```

 
这一段单纯选出分割好的字符串:
 

``` 
select 
    stuff((
 
    select ','+orgname+ '' 
    --select CONCAT(',', requirementID, '') --对于 varchar 可能需要链接字符串
    from org as a 
    ORDER BY [table] 
 
        for xml path('')),1,1,'')
```

----------

## Output when doing merge

几个要点:
 

* 不能使用 `UPDATED` 关键字, 修改的数据全部都出现在 `INSERTED` 里面 
* 只能同时出现一个 OUTPUT

 

``` sql
  merge into XAccess t  
  using zAssessResult_AllRequiredType f  
    on t.attributeID = f.attributeID 
 
  when matched
    then update set 
      ......     
 
  when not matched  
    then insert values(
      ......
 
  )
  output
 
    'AttributeDeterm' RefType
  , INSERTED.ID RefID
  , CASE WHEN ($action = 'INSERT') THEN 'Created' ELSE 'Updated' END as ActionType
  , '' ActionDesc
  , 'System Assess' ActionBy
  , INSERTED.assessDate ActionDate
 
  INTO dbo.ActionLog;
```

----------

## Date - Sp Date Snippets

 

### last day of current month

``` sql
SELECT DATEADD(d, -1, DATEADD(m, DATEDIFF(m, 0, @date) + 1, 0))
```

 

### first day of current month

 

``` sql
SELECT DATEADD(month, DATEDIFF(month, 0, @mydate), 0) AS StartOfMonth
```

 

### get week of the year

``` sql
SELECT DATEPART( wk, @Date)
```

 
----------

## Logic Control

 

``` 
 
       CASE WHEN weight > 250 THEN 'over 250'
            WHEN weight > 200 THEN '201-250'
            WHEN weight > 175 THEN '176-200'
            ELSE '175 or under' END AS weight_group
 
```

 
----------

## Nested Example

 
put it after `then` 
 

``` sql
select case
         when (1 = 1) then
              case when(2=3) then 'A'
                  else 'K'
                  end
         else
          'b'
       end
  from dual;
```

 
----------

## Get Decimal Part 

### Solution 1

``` sql
select x, ABS(x) - FLOOR(ABS(x))
```

### Solution 2

 
More generalized approach may be to merge PARSENAME and % operator.(as answered in two of the answers above)
 
Results as per 1st approach above by SQLMenace
 

``` 
select PARSENAME(0.001,1) 
```

 
Result: 001
 

``` 
select PARSENAME(0.0010,1) 
```

 
Result: 0010
 

``` 
select PARSENAME(-0.001,1)
```

 
Result: 001
 

``` 
select PARSENAME(-1,1)
```

 
Result: -1 --> Should not return integer part
 

``` 
select PARSENAME(0,1)
```

 
Result: 0
 

``` 
select PARSENAME(1,1)
```

 
Result: 1 --> Should not return integer part
 

``` 
select PARSENAME(100.00,1)
```

 
Result: 00
 
Results as per 1st approach above by Pavel Morshenyuk "0." is part of result in this case.
 

``` 
SELECT (100.0001 % 1)
```

 
Result: 0.0001
 

``` 
SELECT (100.0010 % 1)
```

 
Result: 0.0010
 

``` 
SELECT (0.0001 % 1)
```

 
Result: 0.0001
 

``` 
SELECT (0001 % 1)
```

 
Result: 0
 

``` 
SELECT (1 % 1)
```

 
Result: 0
 

``` 
SELECT (100 % 1)
```

 
Result: 0
 
Combining both:
 

``` 
SELECT PARSENAME((100.0001 % 1),1)
```

 
Result: 0001
 

``` 
SELECT PARSENAME((100.0010 % 1),1)
```

 
Result: 0010
 

``` 
SELECT PARSENAME((0.0001 % 1),1)
```

 
Result: 0001
 

``` 
SELECT PARSENAME((0001 % 1),1)
```

 
Result: 0
 

``` 
SELECT PARSENAME((1 % 1),1)
```

 
Result: 0
 

``` 
SELECT PARSENAME((100 % 1),1)
```

 
Result: 0
 

## Table Definition

### Get all table and all columns in DB
 

``` sql
SELECT      TABLE_NAME, COLUMN_NAME
FROM      INFORMATION_SCHEMA.COLUMNS
 
```

 

### Get all table in DB

 

``` sql
SELECT      distinct TABLE_NAME
FROM      INFORMATION_SCHEMA.COLUMNS
```

 

### Get columns from table

 

``` sql
 
SELECT    COLUMN_NAME
FROM      INFORMATION_SCHEMA.COLUMNS
 
WHERE    TABLE_NAME = 'TableNameHere'
 
```

 

### Get tables

 

``` sql
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
where TABLE_NAME like '%chem%'
```

 

### Quick get select statement

 

``` sql
use COEHS_CENTRAL_TEST
 
declare @tablename varchar(100);
set @tablename = 'surveyQuestion';
 
SELECT 'SELECT TOP 50 ' + Stuff((
            SELECT ',' + column_name + ''
              FROM   INFORMATION_SCHEMA.COLUMNS 
              WHERE  table_name = @tablename 
              ORDER  BY column_name 
              FOR XML PATH('')
              ),1,1,'')  
```

----------

## get recordCount for many tables

 

``` sql
 
DECLARE @items NVARCHAR(200); -- 一定要设置成 nvarchar 才能拼接表名, varchar 的话无效
DECLARE @MyCursor CURSOR;
BEGIN
    SET @MyCursor = CURSOR FOR
 /* 实际操作的 SQL, 获取表名数据 */
    SELECT
    TABLE_NAME
 FROM
    INFORMATION_SCHEMA.TABLES
 where TABLE_NAME like 'survey%'
 order by TABLE_NAME
 
    OPEN @MyCursor 
    FETCH NEXT FROM @MyCursor INTO @items
 
    WHILE @@FETCH_STATUS = 0
    BEGIN
   PRINT @items;
   EXEC('select count(*) as ' + @items +' from ' + @items);
      FETCH NEXT FROM @MyCursor INTO @items 
    END; 
 
    CLOSE @MyCursor ;
    DEALLOCATE @MyCursor;
END;
 
```

 
----------

## Small Example

``` sql
 
DECLARE @items VARCHAR;
DECLARE @MyCursor CURSOR;
BEGIN
    SET @MyCursor = CURSOR FOR
 /* 实际操作的 SQL */
    select items from fn_CreateTableFromList('1,2,3',',') t
 
    OPEN @MyCursor 
    FETCH NEXT FROM @MyCursor INTO @items // 这里因为只取出了一列, 如果取出了多列那么 @item 要 declare 成一个 table
 
    WHILE @@FETCH_STATUS = 0
    BEGIN
      /*
       PRINT @items
      */
      FETCH NEXT FROM @MyCursor INTO @items 
    END; 
 
    CLOSE @MyCursor ;
    DEALLOCATE @MyCursor;
END;
```

tags: 跨服务器查询, cross-server, 跨 server
 
----------

## Linked Server

 
一行代码解决所有问题:
 

``` sql
use GEEHS
SELECT * FROM SYS.SERVERS 
```

 
跨服务器查询的格式:
 

``` sql
Select * From ServerName.DbName.SchemaName.TableName
```

 
一个例子:
 

``` sql
select * from Link_GenProdAG.COEHS_WHIRLPOOL.dbo.pcc_attribute
```

 
注意 schemaName 部分的 `dbo` 不能省略否则报以下错误:
 

``` 
An invalid schema or catalog was specified for the provider "SQLNCLI11" for linked server "DevAGListener".
```

 

``` 
select * 
from DevAGListener.GEEHS_TEST.dbo.qryorgsite
```

 
----------

## FETCH 的使用

 
简单易懂
一定要先写上 ORDER BY
另外 OFFSET 以及 FETCH 仅仅接受数字, 字符串不通用
 

``` sql
SELECT First Name + ' ' + Last Name 
FROM Employees 
ORDER BY First Name 
OFFSET 10 ROWS;
```

 

``` sql
SELECT First Name + ' ' + Last Name 
FROM Employees 
ORDER BY First Name 
OFFSET 10 ROWS 
FETCH NEXT 5 ROWS ONLY;
```

----------

## Parent Child hierarchy Example

 
**Hints: this script is Breadth-First-Search**
 

``` sql
 
declare @pc table(CHILD_ID int, PARENT_ID int, [NAME] varchar(80));
 
insert into @pc
select 1,NULL,'Bill' union all
select 2,1,'Jane' union all
select 3,1,'Steve' union all
select 4,3,'Ben' union all
select 5,1,'Andrew' union all
select 6,1,'Tom' union all
select 7,6,'Dick' union all
select 8,6,'Harry' union all
select 9,8,'Stu'
 
; with r as (
      select CHILD_ID, PARENT_ID, [NAME], depth=0, sort=cast(CHILD_ID as varchar(max))
      from @pc
      where PARENT_ID is null
      union all
      select pc.CHILD_ID, pc.PARENT_ID, pc.[NAME], depth=r.depth+1, sort=r.sort+cast(pc.CHILD_ID as varchar(30))
      from r
      inner join @pc pc on r.CHILD_ID=pc.PARENT_ID
 
      -- we could only get 32767 level recursive at most limited by MSSQL 
      -- who could have 30K+ level in their database _(:з」∠)_?
      -- so we could set it as 100 or no limit here
 
      -- where r.depth<32767 
      where r.depth<100 
)
select tree=replicate('-',r.depth*3)+r.[NAME]
from r
order by sort
 
-- same configuration here, 100 is enough 
option(maxrecursion 100);
-- option(maxrecursion 32767);
 
```

 
----------

## SQL server 添加换行符

 
Tags: 换行符, SQL Server, new line, line break
 

> 制表符: CHAR(9)

换行符: CHAR(10)
回车符: CHAR(13) 回车符: CHAR(13)
 

### 对于 Print

 

``` 
print 'a'+CHAR(10)+'b'
```

 
结果为
 

``` 
a
b
```

 

### 对于 select

 

``` 
select 'a'+CHAR(13)+CHAR(10)+'b'
```

 
必须是 CHAR(13)+CHAR(10), 不是 CHAR(10)+CHAR(13), 因为文本中的是{CF}{CL}, 回车, 换行
 
则输出文本为
 

``` 
a
b
```

tags: merge, sql server, sql 2012
 
----------

## Merge

### Desc
 
类似如下的需求: 
 

> 对数据表 Table 插入对应的数据 Data
>
> 如果** Table 中存在, 而 Data 中也存在的数据**则将其激活 (set archived = 0)
>
> 如果** Table 中不存在, 而 Data 中存在的数据**则插入 Table

 
需求可以进行扩展: 
 

> 如果** Table 中存在, 而在 Data 中不存在的数据**则从 Table 中删除 (set archived = 1)

 
Merge
 
如果用旧版本的 SQL 可能需要各种 `Join` , `Exists` , `Insert` , `Update` , `Delete` 
 
但是实际上用一条含有 `Merge` 的关键字就可以实现这样的需求
 
用法可以参考 MS 的 API
 
----------

## Example

 

``` sql
    /* merge data from this small table*/
    declare @MergeFrom as table(
        a integer
    )
 
    /* data saved in database*/
    declare @db as table(
        a integer,
        archived integer
    )
 
    insert into @MergeFrom values (2)
    insert into @MergeFrom values (3)
    insert into @MergeFrom values (4) /*will be inserted */
 
    insert into @db values(1,0) /*will be archived */
    insert into @db values(2,0)
    insert into @db values(3,1) /*will be updated*/
 
    /* Before merge */
    select * 
     from @db
 
    merge into @db as t
    using @MergeFrom as f
        on t.a = f.a
    when matched
        /* matched: these record are in use, set not archived */
        then update set t.archived = 0 
    when not matched 
        /* record not matched in @MergeFrom: insert into @MergeFrom */
        then insert values(f.a, 0) 
 
        /* 另一种对特定 column 的 insert
            INSERT (id, f5, f6) VALUES(t2.id, t2.f2, t2.f3);
        */
 
    /*when not matched by source
        /* Dangerous!!! ALL record in @db not matched in @MergeFrom:*/
        then delete*/; 
    /*WHEN NOT MATCHED BY SOURCE AND t.attributeID = 399 // only hardcoded value here
        THEN UPDATE
        SET isActive = 0;*/
 
    /* after Merge */
    select * 
     from   @db
```

 

* 这里对于 `when` 之后的条件可以进行扩展, 比如添加 `AND` 或者其他条件等等
* `Then` 后面可以接一个完整的 `SQL 语句` 
* `Merge` 后面也可以添加各种 `select` 的修饰符, 比如 `top` 等等
*  注意最后一个条件 `when not matched by source` 
  + 这个条件如果没有加限制条件就会修改 `@db` 中其他所有数据
  + 添加的限制条件不能使用 f 里面的行和列, 只能使用静态条件

 
----------

## SQL: 实现 Monthly SumUp 的统计

首先得到每月的记录
 

``` sql
WITH TABLE monthlydata AS 
( 
         SELECT   sum(xxx) AS totalcases, 
                  id, 
                  month(date) AS [month] 
         FROM     yourtable 
         GROUP BY id, 
                  month(date) 
)
```

 
----------

## 然后进行 Sum up

对上方表进行操作:
 

* 若部分 month 的没有产值而显示为 0 的话
 - 不需要额外操作
* 若部分 month 的没有产值而显示为 NULL 的话
 - 进行一下判断将其变为 0
* 若部分 month 的没有产值导致上方表结果中只有一年中部分月份的数据
 - 额外 JOIN 一张表变量, 这张表有 12 行数据分别是 1-12
``` sql
declare @monthIndex as table 
(
    [month] INT
)
 
DECLARE @hid INT;
SET @hid=1;
WHILE @hid <= 12
BEGIN 
    INSERT INTO @monthIndex VALUES(@hid)
    SET @hid = @hid + 1;
END
```

 
然后进行判断

``` sql
select 
    i.siteid,
    mindex.month,
    sum(totalcases ) as SumUpRecCases
 
from MonthlyData, @monthIndex mindex
where i.month <= mindex.month
group by i.siteid, mindex.month
```

 
最终会显示多行
 
----------

## Cross Join

Below 2 queries are same
Make sure the column to join

``` SQL
USE AdventureWorks2008R2;
GO
SELECT p.BusinessEntityID, t.Name AS Territory
FROM Sales.SalesPerson p
 
     CROSS JOIN Sales.SalesTerritory t
 
WHERE p.TerritoryID = t.TerritoryID
ORDER BY p.BusinessEntityID;
 
-- Or
 
USE AdventureWorks2008R2;
GO
SELECT p.BusinessEntityID, t.Name AS Territory
FROM Sales.SalesPerson p
 
   INNER JOIN Sales.SalesTerritory t
   ON p.TerritoryID = t.TerritoryID
 
ORDER BY p.BusinessEntityID;
```

 
----------

## FOR XML (SQL Server)

将 select 出来的数据转换成 nested html
 
Example
 

``` sql
USE AdventureWorks2012
GO
SELECT Cust.CustomerID, 
       OrderHeader.CustomerID,
       OrderHeader.SalesOrderID, 
       OrderHeader.Status
FROM Sales.Customer Cust 
INNER JOIN Sales.SalesOrderHeader OrderHeader
ON Cust.CustomerID = OrderHeader.CustomerID
FOR XML AUTO
```

 
执行以下查询:
 

``` sql
sql
SELECT Cust.CustomerID, 
       OrderHeader.CustomerID,
       OrderHeader.SalesOrderID, 
       OrderHeader.Status,
       Cust.CustomerType
FROM Sales.Customer Cust, Sales.SalesOrderHeader OrderHeader
WHERE Cust.CustomerID = OrderHeader.CustomerID
ORDER BY Cust.CustomerID
FOR XML AUTO
```

下面是部分结果:

``` sql
<Cust CustomerID="1" CustomerType="S">
  <OrderHeader CustomerID="1" SalesOrderID="43860" Status="5" />
  <OrderHeader CustomerID="1" SalesOrderID="44501" Status="5" />
  <OrderHeader CustomerID="1" SalesOrderID="45283" Status="5" />
  <OrderHeader CustomerID="1" SalesOrderID="46042" Status="5" />
</Cust>
......
```

 

### Syntax

在最后加上

``` 
FOR XML (RAW,auto,EXPLICIT,PATH)
```

即可, 对应的子句表示了对应的模式
 
关于不同的后缀
 

* AUTO

将所有的值设置成 HTML 的 argument 的形式

``` HTML
<h columnA="A" columnB="B">
```

* PATH
 - PATH('')
 将所有的值设置成 tag 的嵌套
 - PATH('123')
 在所有的嵌套外面加一层<123>嵌套<br>
 <font color="blue">注意对于 XMLParse 来解析 XML 的话必须在最外层有一个 tag </font>
 

### Personal Example

关于 FOR XML 与 Group By With Cube 的混用

``` sql
with zInjuryCases as (
            --All data for injury cases
            SELECT    h.case_date, h.case_id, h.case_type, h.CASE_LEVEL, h.r_period, h.r_year,
                         s.orgname, isnull(s.suborg,'') suborg, s.location, s.siteregion, s.sitecountry
 
            FROM    SiteHandSCase h WITH (NOLOCK) 
                INNER JOIN qryOrgSite s WITH (NOLOCK) ON h.Org = s.Org AND h.Location = s.Location
            WHERE        R_Year = 2015
                    AND        h.case_level IN ('Level A','Level B')
                    AND exists (
                                select case_date 
                                from qrySiteSiteDetail sd with (nolock) 
                                where h.org=sd.org and h.location=sd.location
                                AND sd.iistart_date is not null 
                                and sd.siteiandi > 0 
                                and h.case_date >= sd.iistart_date
 
                                and sd.powersuite_on <> 0 
                                and sd.reporting = 1 ) 
                    and s.archive=0 
                    and s.orgarchive=0
                    and s.org != 0 
                    and s.location not like 'Demonstration%'
), zInjuryCases_Detail as (
 
    SELECT orgname, suborg, location, siteregion, sitecountry,
     sum(case when case_level = 'Level A' then 1 else null end) ACount,
     sum(case when case_level = 'Level B' then 1 else null end) BCount,
        (
            select case_id, case_date
            from zInjuryCases d
            where case_level = 'Level A'
                and (d.orgname = z.orgname or z.orgname is null)
                and (d.suborg = z.suborg or z.suborg is null)
                and (d.location = z.location or z.location is null)
                and (d.siteregion = z.siteregion or z.siteregion is null)
                and (d.sitecountry = z.sitecountry or z.sitecountry is null)
                FOR XML PATH ('')
        )AS Level_A_Detail,
        (
            select case_id, case_date
            from zInjuryCases d
            where case_level = 'Level B'
                and (d.orgname = z.orgname or z.orgname is null)
                and (d.suborg = z.suborg or z.suborg is null)
                and (d.location = z.location or z.location is null)
                and (d.siteregion = z.siteregion or z.siteregion is null)
                and (d.sitecountry = z.sitecountry or z.sitecountry is null)
            FOR XML PATH ('')
        ) AS Level_B_Detail
    from zInjuryCases z
    GROUP BY orgname, suborg, location, siteregion, sitecountry WITH CUBE
)
 
select * from zInjuryCases_Detail
```

 
几个要点:
 

1. 先搜索出所有的数据
2. 然后从数据中带条件搜索出然后 FOR XML
3. 再然后 Group by

 
简化版:

``` sql
    SELECT orgname, suborg, location, siteregion, sitecountry,
        (
            select case_id, case_date
            from [主要的数据源] d
                FOR XML PATH ('')
        )AS Level_A_Detail
    from zInjuryCases 
    GROUP BY orgname, suborg, location, siteregion, sitecountry WITH CUBE
```

----------

##  显示小数的除法

 

### Example

 

``` 
SELECT CAST(1 AS float) / CAST(3 AS float)
```

 
or
 

``` 
SELECT CAST(MyIntField1 AS float) / CAST(MyIntField2 AS float)
```

### Substitute

Because SQL Server performs integer division. Try this:
 

``` 
select 1 * 1.0 / 3
```

 
This is helpful when you pass integers as params.
 

``` 
select x * 1.0 / y
```

<P align=center><font color="red"> PHOTO & FILE ATTACHED
DO NOT MERGE/RENAME THIS POST</font></P>
 
----------

## DATEADD 

将指定 number 时间间隔 (有符号整数) 与指定 date 的指定 datepart 相加后, 返回该 date.datepart 是 date 的一部分, 比如日期部分或者时间部分)
 

``` sql
DATEADD (datepart , number , date )
```

 

### number

一个表达式, 它可以解析为与 date 的 datepart 相加的 int. 用户定义的变量是有效的.
如果您指定一个带小数的值, 则将小数截去且不进行舍入.

### date

是一个可以解析为 time, date, smalldatetime, datetime, datetime2 或 datetimeoffset 值的表达式.date 可以是表达式, 列表达式, 用户定义的变量或字符串文字. 如果表达式是字符串文字, 则它必须解析为一个 datetime 值. 为避免不确定性, 请使用四位数年份. 有关两位数年份的信息, 请参阅 配置两位数年份截止服务器配置选项.
 
----------

## Simplest Way To Use Pivot In SQL Query

 

### Example

 

``` SQL
SELECT * 
FROM (
    SELECT 
    year(invoiceDate) as [year], 
    left(datename(month,invoicedate), 3)as [month], _
    InvoiceAmount as Amount 
FROM Invoice
) as InvoiceResult 
```

 
可以将竖着放的表处理成横着的一行一行
 

``` SQL
SELECT *
FROM (
    SELECT 
        year(invoiceDate) as [year],left(datename(month,invoicedate),3)as [month], 
        InvoiceAmount as Amount 
    FROM Invoice
) as s
PIVOT
(
    SUM(Amount) --可能对于原来的每个月会有多个数据, 因此可以使用聚合函数
    FOR [month] IN (jan, feb, mar, apr, 
    may, jun, jul, aug, sep, oct, nov, dec)--只需要写字段的名称即可, 不需要加单引号
)AS pvt
```

 
----------

## 字符串中使用单引号

 

``` sql
exec('delete from '+@TableName+ ' where ImportTime = '''+@Imp_Date+'''') end
```

在字符串中两个单引号等于一个单引号
但是要注意字符串本身就需要一对单引号括起来
 

### 截取字符串

 

     

这里截取一个特殊字符 (char(166) 就是那个竖线) 两侧的字符串
 

``` sql
DECLARE @a as varchar(20)
set @a = '123456¦89';
select @a
select  charindex(char(166), @a)
 
select substring(@a, 0, charindex(char(166), @a)) // 截取左边
select substring(@a, charindex(char(166), @a)+1, len(@a))//截取右边
```

 
